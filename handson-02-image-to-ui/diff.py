#!/usr/bin/env python3
"""
画像差分スクリプト
元画像とスクリーンショットを比較して差分を可視化する
"""
from PIL import Image, ImageChops, ImageEnhance, ImageDraw, ImageFont
import sys
import os
import math

def compare_images(original_path: str, screenshot_path: str, output_path: str, section: str = "full"):
    """2枚の画像を比較して差分ハイライト画像を生成する"""

    # 画像を読み込み
    orig = Image.open(original_path).convert("RGB")
    shot = Image.open(screenshot_path).convert("RGB")

    orig_w, orig_h = orig.size
    shot_w, shot_h = shot.size

    print(f"元画像サイズ: {orig_w} x {orig_h}")
    print(f"スクショサイズ: {shot_w} x {shot_h}")

    # スクリーンショットを元画像サイズにリサイズ（比較のため）
    shot_resized = shot.resize((orig_w, orig_h), Image.LANCZOS)

    # 差分を計算
    diff = ImageChops.difference(orig, shot_resized)

    # 差分を強調（見やすくするため）
    enhancer = ImageEnhance.Brightness(diff)
    diff_enhanced = enhancer.enhance(5.0)

    # 差分を赤チャンネルに変換（赤でハイライト）
    r, g, b = diff_enhanced.split()
    diff_red = Image.merge("RGB", (r, Image.new("L", r.size, 0), Image.new("L", r.size, 0)))

    # 元画像に差分を重ねる（半透明）
    orig_copy = orig.copy().convert("RGBA")
    diff_overlay = diff_red.convert("RGBA")

    # 差分のアルファを動的に設定（差分が大きいほど不透明）
    r_data = list(r.getdata())
    alpha_data = [min(255, v * 3) for v in r_data]
    diff_overlay.putalpha(Image.new("L", r.size, 0))

    # 並べて比較する画像を作成
    margin = 20
    total_w = orig_w * 3 + margin * 4
    total_h = orig_h + margin * 2 + 60

    comparison = Image.new("RGB", (total_w, total_h), (240, 240, 240))

    # 元画像
    comparison.paste(orig, (margin, margin + 60))
    # スクリーンショット（リサイズ済み）
    comparison.paste(shot_resized, (orig_w + margin * 2, margin + 60))
    # 差分
    comparison.paste(diff_enhanced, (orig_w * 2 + margin * 3, margin + 60))

    # ラベルを追加
    draw = ImageDraw.Draw(comparison)
    label_y = margin + 10

    def draw_label(text, x):
        # シンプルなテキスト描画
        draw.text((x, label_y), text, fill=(50, 50, 50))

    draw_label("元画像", margin)
    draw_label("現在のUI", orig_w + margin * 2)
    draw_label("差分（明るいほど差異大）", orig_w * 2 + margin * 3)

    comparison.save(output_path, quality=85)
    print(f"差分画像を保存: {output_path}")

    # 差分の統計情報
    diff_array = list(diff.getdata())
    total_pixels = orig_w * orig_h
    diff_pixels = sum(1 for p in diff_array if max(p) > 10)
    diff_ratio = diff_pixels / total_pixels * 100

    print(f"\n--- 差分統計 ---")
    print(f"総ピクセル数: {total_pixels:,}")
    print(f"差分あるピクセル数: {diff_pixels:,}")
    print(f"差分率: {diff_ratio:.2f}%")
    print(f"類似度: {100 - diff_ratio:.2f}%")

    return diff_ratio


def crop_section(image_path: str, output_path: str, top_ratio: float, bottom_ratio: float):
    """画像の特定セクションをトリミング"""
    img = Image.open(image_path)
    w, h = img.size
    top = int(h * top_ratio)
    bottom = int(h * bottom_ratio)
    cropped = img.crop((0, top, w, bottom))
    cropped.save(output_path)
    print(f"セクション保存: {output_path} ({w}x{bottom-top})")
    return cropped


if __name__ == "__main__":
    base_dir = "/Users/shotakahashi/git/claude-code/claude-code-training/handson-02-image-to-ui"
    original = f"{base_dir}/screenshots/domestic_kai_input_pc.jpeg"
    screenshot = f"{base_dir}/screenshot-v3.jpeg"
    diff_out = f"{base_dir}/diff-result.jpeg"

    if not os.path.exists(screenshot):
        print(f"エラー: スクリーンショットが見つかりません: {screenshot}")
        sys.exit(1)

    print("=== 画像差分分析 ===\n")
    diff_ratio = compare_images(original, screenshot, diff_out)

    print("\n=== セクション別トリミング ===")
    sections = {
        "header":    (0.00, 0.07),   # ヘッダー
        "form":      (0.07, 0.30),   # フォーム部分
        "button":    (0.25, 0.35),   # ボタン周辺
        "notice":    (0.30, 0.70),   # 注意事項
        "sidebar":   (0.05, 0.75),   # サイドバー（右側）
    }

    orig_img = Image.open(original)
    for name, (t, b) in sections.items():
        crop_section(original, f"{base_dir}/section-orig-{name}.jpeg", t, b)

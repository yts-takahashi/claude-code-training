import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-kabu-order-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './kabu-order-form.component.html',
})
export class KabuOrderFormComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      torihiki: ['genbutsu'],
      koza: ['main'],
      suryo: [100],
      joken: ['sashiNe'],
      tanka: ['3,220'],
      sor: ['suru'],
      shikko: ['nashi'],
      yuko: ['toujitsu'],
      renzoku: ['shinai'],
    });
  }

  get gaisanKingaku(): number {
    const tankaStr = this.form.get('tanka')?.value || '0';
    const tanka = parseFloat(String(tankaStr).replace(/,/g, '')) || 0;
    const suryo = this.form.get('suryo')?.value || 0;
    return tanka * suryo;
  }

  decreaseSuryo(): void {
    const current = this.form.get('suryo')?.value || 0;
    if (current >= 100) {
      this.form.get('suryo')?.setValue(current - 100);
    }
  }

  increaseSuryo(): void {
    const current = this.form.get('suryo')?.value || 0;
    this.form.get('suryo')?.setValue(current + 100);
  }

  decreaseTanka(): void {
    const tankaStr = this.form.get('tanka')?.value || '0';
    const current = parseFloat(String(tankaStr).replace(/,/g, '')) || 0;
    if (current > 1) {
      const newVal = current - 1;
      this.form.get('tanka')?.setValue(newVal.toLocaleString('ja-JP'));
    }
  }

  increaseTanka(): void {
    const tankaStr = this.form.get('tanka')?.value || '0';
    const current = parseFloat(String(tankaStr).replace(/,/g, '')) || 0;
    const newVal = current + 1;
    this.form.get('tanka')?.setValue(newVal.toLocaleString('ja-JP'));
  }

  onClear(): void {
    this.form.reset({
      torihiki: 'genbutsu',
      koza: 'main',
      suryo: 100,
      joken: 'sashiNe',
      tanka: '3,220',
      sor: 'suru',
      shikko: 'nashi',
      yuko: 'toujitsu',
      renzoku: 'shinai',
    });
  }

  onConfirm(): void {
    alert('注文内容を確認画面へ（未実装）');
  }
}

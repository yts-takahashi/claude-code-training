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
      tanka: [3220],
      sor: ['suru'],
      shikko: ['nashi'],
      yuko: ['toujitsu'],
      renzoku: ['shinai'],
    });
  }

  get gaisanKingaku(): number {
    const tanka = this.form.get('tanka')?.value || 0;
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
    const current = this.form.get('tanka')?.value || 0;
    if (current > 1) {
      this.form.get('tanka')?.setValue(current - 1);
    }
  }

  increaseTanka(): void {
    const current = this.form.get('tanka')?.value || 0;
    this.form.get('tanka')?.setValue(current + 1);
  }

  onClear(): void {
    this.form.reset({
      torihiki: 'genbutsu',
      koza: 'main',
      suryo: 100,
      joken: 'sashiNe',
      tanka: 3220,
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

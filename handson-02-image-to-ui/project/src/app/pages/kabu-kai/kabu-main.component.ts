import { Component } from '@angular/core';

@Component({
  selector: 'app-kabu-main',
  standalone: true,
  template: '',
})
export class KabuMainComponent {
  buySell = 'buy';
  quantity = 100;
  limitPrice = '3,192';
  orderType = 'sashine';
  sor = 'yes';
  exec = 'none';
  expiry = 'today';
  contOrder = 'no';

  get estimatedAmount(): number {
    const price = parseFloat(this.limitPrice.replace(/,/g, '')) || 3192;
    return this.quantity * price;
  }

  clearForm() {
    this.quantity = 100;
    this.limitPrice = '3,192';
    this.orderType = 'sashine';
    this.sor = 'yes';
    this.exec = 'none';
    this.expiry = 'today';
    this.contOrder = 'no';
  }

  confirmOrder() {
    alert(`注文内容を確認してください。\nソニーグループ ${this.buySell === 'buy' ? '買付' : '売付'} ${this.quantity}株\n概算金額: ${this.estimatedAmount.toLocaleString()}円`);
  }
}

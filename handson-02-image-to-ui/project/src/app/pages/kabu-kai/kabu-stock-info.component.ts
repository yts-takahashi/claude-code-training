import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface StockQuote {
  label: string;
  value: string;
  date: string;
  valueClass?: string;
}

interface OrderBook {
  sellQty: string;
  price: string | number;
  buyQty: string;
  isCurrentPrice?: boolean;
  isSpecial?: boolean;
}

@Component({
  selector: 'app-kabu-stock-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kabu-stock-info.component.html',
})
export class KabuStockInfoComponent {
  activeTab: 'summary' | 'news' | 'other' = 'summary';

  stockQuotes: StockQuote[] = [
    { label: '現在値', value: '3,220.0', date: '2024/11/26 10:21', valueClass: 'font-bold text-red-600' },
    { label: '(前日比)', value: '-24.5  -2.96%', date: '2024/11/26 10:21', valueClass: 'text-red-600' },
    { label: '前日終値', value: '1,034.0', date: '2024/11/26 10:21' },
    { label: '始値', value: '975.5', date: '2024/11/26 10:21' },
    { label: '高値', value: '1,024.1', date: '2024/11/26 10:21' },
    { label: '安値', value: '961.0', date: '2024/11/26 10:21' },
    { label: '出来高', value: '12,146,200', date: '2024/11/26 10:21' },
    { label: 'VWAP', value: '12,146,200', date: '2024/11/26 10:21' },
  ];

  orderBook: OrderBook[] = [
    { sellQty: '', price: '成行', buyQty: '', isCurrentPrice: false, isSpecial: true },
    { sellQty: '99,999,999', price: 'OVER', buyQty: '', isCurrentPrice: false, isSpecial: true },
    { sellQty: '20,000', price: 338, buyQty: '' },
    { sellQty: '20,000', price: 337, buyQty: '' },
    { sellQty: '20,000', price: 336, buyQty: '' },
    { sellQty: '20,000', price: 335, buyQty: '' },
    { sellQty: '20,000', price: 334, buyQty: '' },
    { sellQty: '20,000', price: 333, buyQty: '' },
    { sellQty: '20,000', price: 332, buyQty: '' },
    { sellQty: '20,000', price: 331, buyQty: '' },
    { sellQty: '現在 ↓', price: 330, buyQty: '', isCurrentPrice: true },
    { sellQty: '', price: 330, buyQty: '15,000' },
    { sellQty: '', price: 329, buyQty: '15,000' },
    { sellQty: '', price: 328, buyQty: '15,000' },
    { sellQty: '', price: 327, buyQty: '15,000' },
    { sellQty: '', price: 326, buyQty: '15,000' },
    { sellQty: '', price: 325, buyQty: '15,000' },
    { sellQty: '', price: 324, buyQty: '15,000' },
    { sellQty: '', price: 323, buyQty: '15,000' },
    { sellQty: '', price: 322, buyQty: '15,000' },
    { sellQty: '', price: 'UNDER', buyQty: '123,456,789', isSpecial: true },
  ];

  // SVG line chart data points (Y-axis: 325-340 range mapped to 70-10)
  get chartPoints(): string {
    const prices = [336, 338, 337, 340, 339, 337, 335, 334, 336, 337, 335, 333, 334, 333, 332, 331, 333, 332, 330, 331, 330, 329, 330, 331, 330, 329, 328, 330, 329, 328];
    const minPrice = 324;
    const maxPrice = 342;
    const chartMinX = 42;
    const chartMaxX = 468;
    const chartMinY = 72;
    const chartMaxY = 10;
    return prices.map((p, i) => {
      const x = chartMinX + (i / (prices.length - 1)) * (chartMaxX - chartMinX);
      const y = chartMinY + ((maxPrice - p) / (maxPrice - minPrice)) * (chartMaxY - chartMinY);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
  }

  buyingPower = {
    mainAccount: '1,100,000円',
    nisaAccount: '123,456,789,012円',
    nisaUnused: '成長投資枠未利用額：2,400,000円',
  };
}

import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<h1>FinUI Design System</h1><p>Angularコンポーネントライブラリ。Storybookでコンポーネントカタログをご覧ください。</p>`,
})
export class AppComponent {}

bootstrapApplication(AppComponent).catch((err) => console.error(err));

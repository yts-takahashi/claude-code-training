import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="flex h-screen items-center justify-center bg-gray-50">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-navy-900 mb-4">FinScope</h1>
        <p class="text-gray-500">
          金融ダッシュボードの開発を始めましょう
        </p>
      </div>
    </div>
    <router-outlet />
  `,
})
export class AppComponent {
  title = 'FinScope';
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KabuNavbarComponent } from './kabu-navbar.component';
import { KabuTabBarComponent } from './kabu-tab-bar.component';
import { KabuOrderFormComponent } from './kabu-order-form.component';
import { KabuStockInfoComponent } from './kabu-stock-info.component';
import { KabuNoticeComponent } from './kabu-notice.component';
import { KabuPageFooterComponent } from './kabu-page-footer.component';

@Component({
  selector: 'app-kabu-kai-input',
  standalone: true,
  imports: [
    CommonModule,
    KabuNavbarComponent,
    KabuTabBarComponent,
    KabuOrderFormComponent,
    KabuStockInfoComponent,
    KabuNoticeComponent,
    KabuPageFooterComponent,
  ],
  template: `
    <div class="kabu-page" style="font-family: var(--font_default); min-height: 100vh; background-color: var(--cc-background); display: flex; flex-direction: column;">

      <!-- Top navigation -->
      <app-kabu-navbar />

      <!-- Tab navigation -->
      <app-kabu-tab-bar />

      <!-- Main content area -->
      <main class="flex-1 px-4 py-3" style="max-width: 1400px; margin: 0 auto; width: 100%;">
        <div class="flex gap-4 items-start">

          <!-- Left: Order form (約65%) -->
          <div class="flex-shrink-0" style="width: 65%; min-width: 600px; max-width: 850px;">
            <app-kabu-order-form />
          </div>

          <!-- Right: Stock info (約35%) -->
          <div class="flex-1 min-w-0" style="min-width: 280px;">
            <app-kabu-stock-info />
          </div>
        </div>

        <!-- Notice section (full width below) -->
        <app-kabu-notice />
      </main>

      <!-- Footer -->
      <app-kabu-page-footer />
    </div>
  `,
})
export class KabuKaiInputComponent {}

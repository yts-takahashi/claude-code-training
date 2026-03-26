import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

export type NotificationType = 'info' | 'warning' | 'error' | 'success';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: string;
  read: boolean;
}

export interface NotificationBellProps {
  notifications: NotificationItem[];
}

const typeIconPaths: Record<NotificationType, string> = {
  info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  error: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
  success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
};

const typeColors: Record<NotificationType, string> = {
  info: 'text-blue-500',
  warning: 'text-yellow-500',
  error: 'text-red-500',
  success: 'text-green-500',
};

/**
 * NotificationBell - 通知ベルコンポーネント
 *
 * 融資承認通知、期限切れアラート、システム通知など、
 * 重要な通知をユーザーに届けるベルアイコンです。
 */
@Component({
  selector: 'fin-notification-bell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-bell.component.html',
})
export class NotificationBellComponent {
  @Input() notifications: NotificationItem[] = [];
  @Input() className = '';

  @Output() markAsRead = new EventEmitter<string>();
  @Output() markAllAsRead = new EventEmitter<void>();
  @Output() notificationClick = new EventEmitter<NotificationItem>();

  isOpen = false;

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:mousedown', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  get unreadCount(): number {
    return this.notifications.filter((n) => !n.read).length;
  }

  get displayUnreadCount(): string {
    return this.unreadCount > 99 ? '99+' : String(this.unreadCount);
  }

  toggleOpen(): void {
    this.isOpen = !this.isOpen;
  }

  getIconPath(type: NotificationType): string {
    return typeIconPaths[type];
  }

  getIconColor(type: NotificationType): string {
    return typeColors[type];
  }

  onNotificationItemClick(notification: NotificationItem): void {
    this.markAsRead.emit(notification.id);
    this.notificationClick.emit(notification);
  }

  onMarkAllAsRead(): void {
    this.markAllAsRead.emit();
  }
}

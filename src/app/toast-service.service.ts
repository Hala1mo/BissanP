import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastServiceService {

  toasts: any[] = []

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options, show: true });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  constructor() { }
}

import { Component, TemplateRef } from '@angular/core';
import { ToastServiceService } from '../toast-service.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toast.component.html',
  host: { '[class.ngb-toasts]': 'true' },
})
export class ToastComponent {
  constructor(public toastService: ToastServiceService) {}

  isTemplate(toast: { textOrTpl: any }) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}

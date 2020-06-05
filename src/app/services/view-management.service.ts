import { Injectable, ComponentRef, ViewRef } from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ViewManagementService {
  constructor() { }

  get modal(): ModalComponent {
    return this.modalRef.instance;
  }

  private views: Map<number, ViewRef> = new Map();

  private modalRef: ComponentRef<ModalComponent>;

  registerView(id: number, view: ViewRef): void {
    this.views.set(id, view);
  }

  getView(id: number): ViewRef {
    return this.views.get(id);
  }

  registerModalRef(ref: ComponentRef<ModalComponent>): void {
    if (this.modalRef != null) {
      console.warn('modal component already registered. skipping.');
      return;
    }
    this.modalRef = ref;
    this.modalRef.instance.hide();

    this.modalRef.instance.hidden$.subscribe(hidden => {
      if (hidden) {
        this.setScroll('enabled');
      } else {
        this.setScroll('disabled');
      }
    });
  }

  private setScroll(toggle: 'disabled' | 'enabled') {
    switch (toggle) {
      case 'disabled':
        document.body.style.overflow = 'hidden';
      break;
      case 'enabled':
        document.body.style.overflow = 'auto';
      break;
    }
  }
}

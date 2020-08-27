import { Injectable, ComponentRef, TemplateRef, EmbeddedViewRef, OnDestroy } from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewManagementService implements OnDestroy {
  constructor() { }

  get modal(): ModalComponent {
    return this.modalRef.instance;
  }

  private modalToggleSub: Subscription;
  private modalRef: ComponentRef<ModalComponent>;

  ngOnDestroy() {
    if (this.modalToggleSub) {
      this.modalToggleSub.unsubscribe();
    }
  }

  createViewFromTemplate(template: TemplateRef<any>): EmbeddedViewRef<any> {
    return template.createEmbeddedView(null);
  }

  registerModalRef(ref: ComponentRef<ModalComponent>): void {
    if (this.modalRef != null) {
      console.warn('modal component already registered. skipping.');
      return;
    }
    this.modalRef = ref;
    this.modalRef.instance.hide();

    this.modalToggleSub = this.modalRef.instance.hidden$.subscribe(hidden => {
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

import { Injectable, ComponentRef, ViewRef } from "@angular/core";

import { ModalComponent } from "../components/modal/modal.component";
import { BehaviorSubject } from "rxjs";
import { filter } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ViewManagementService {
  constructor() {}

  private views: Map<number, ViewRef> = new Map();
  registerView(id: number, view: ViewRef): void {
    if (this.getView(id)) {
      //console.warn(`view id ${id} already registered. skipping.`);
      return;
    }
    this.views.set(id, view);
  }
  getView(id: number): ViewRef {
    return this.views.get(id);
  }

  private modalRef: ComponentRef<ModalComponent>;
  get modalInstance(): ModalComponent {
    return this.modalRef.instance;
  }

  private currentModalView = new BehaviorSubject<ViewRef>(undefined);
  updateModalView(id: number) {
    this.currentModalView.next(this.getView(id));
  }

  registerModalRef(ref: ComponentRef<ModalComponent>) {
    if (this.modalRef != undefined) {
      console.warn("modal component already registered. skipping.");
      return;
    }
    this.modalRef = ref;
    this.currentModalView.pipe(filter(v => v != undefined)).subscribe(view => {
      const instance = this.modalRef.instance;
      instance.content.detach();
      instance.content.insert(view);
    });
  }
}

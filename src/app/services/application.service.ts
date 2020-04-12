import {
  Injectable,
  ComponentFactoryResolver,
  Injector,
  ComponentRef,
  ViewContainerRef,
  ViewRef
} from "@angular/core";

import { ModalComponent } from "../components/modal/modal.component";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ApplicationService {
  constructor(private cfr: ComponentFactoryResolver, private _inj: Injector) {}

  private views: Map<number, ViewRef> = new Map();
  registerView(id: number, view: ViewRef): void {
    if (this.getView(id)) {
      console.warn(`view id ${id} already registered. skipping.`);
      return;
    }
    this.views.set(id, view);
  }
  getView(id: number): ViewRef {
    return this.views.get(id);
  }

  private modalContainer: ViewContainerRef;
  private _modalRef: ComponentRef<ModalComponent>;
  private get modalRef() {
    if (this.modalContainer == undefined) {
      throw new Error("Modal container not registered within application");
    }
    if (this._modalRef == undefined) {
      this._modalRef = this.modalContainer.createComponent(
        this.cfr.resolveComponentFactory(ModalComponent),
        null,
        this._inj
      );
      this.currentModalView.subscribe(view => {
        if (view != undefined) {
          const instance = this._modalRef.instance;
          instance.content.detach();
          instance.content.insert(view);
        }
      });
    }
    return this._modalRef;
  }
  get modalInstance(): ModalComponent {
    return this.modalRef.instance;
  }
  private currentModalView = new BehaviorSubject<ViewRef>(undefined);
  updateModalView(id: number) {
    this.currentModalView.next(this.getView(id));
  }

  registerModalContainer(container: ViewContainerRef) {
    if (this.modalContainer != undefined) {
      console.warn("modal container already registered. skipping.");
      return;
    }
    this.modalContainer = container;
  }
}

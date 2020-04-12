import {
  Component,
  ViewEncapsulation,
  HostBinding,
  ViewChild,
  ViewRef,
  ViewContainerRef
} from "@angular/core";

@Component({
  selector: "moods-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ModalComponent {
  constructor() {}

  @ViewChild("content", { read: ViewContainerRef })
  content: ViewContainerRef;

  @HostBinding("class.hidden")
  hidden = true;

  hide() {
    this.hidden = true;
  }

  show() {
    this.hidden = false;
  }
}

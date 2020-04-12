import {
  Component,
  ViewEncapsulation,
  HostBinding,
  Input,
  ViewChild,
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

  @HostBinding("class.hidden")
  @Input()
  hidden = true;

  @ViewChild("container", { read: ViewContainerRef, static: true })
  content: ViewContainerRef;

  hide() {
    this.hidden = true;
  }

  show() {
    this.hidden = false;
  }
}

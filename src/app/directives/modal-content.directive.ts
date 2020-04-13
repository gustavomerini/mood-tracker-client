import {
  Directive,
  Input,
  TemplateRef,
  OnInit,
  EmbeddedViewRef
} from "@angular/core";
import { ViewManagementService } from "../services/view-management.service";

@Directive({
  selector: "[modalContentId]"
})
export class ModalContentDirective implements OnInit {
  @Input() modalContentId: number;
  private view: EmbeddedViewRef<any>;

  constructor(
    private viewService: ViewManagementService,
    private template: TemplateRef<any>
  ) {}

  ngOnInit() {
    this.view = this.template.createEmbeddedView(null);
    this.viewService.registerView(this.modalContentId, this.view);
  }

  ngOnDestroy() {
    this.view.destroy();
  }
}

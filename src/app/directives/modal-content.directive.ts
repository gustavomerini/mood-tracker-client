import { Directive, Input, TemplateRef, OnInit } from "@angular/core";
import { ViewManagementService } from "../services/view-management.service";

@Directive({
  selector: "[modalContentId]"
})
export class ModalContentDirective implements OnInit {
  @Input() modalContentId: number;

  constructor(
    private viewService: ViewManagementService,
    private template: TemplateRef<any>
  ) {}

  ngOnInit() {
    this.viewService.registerView(
      this.modalContentId,
      this.template.createEmbeddedView({})
    );
    this.viewService.updateModalView(this.modalContentId);
  }
}

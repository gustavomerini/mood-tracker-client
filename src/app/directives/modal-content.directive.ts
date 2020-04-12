import { Directive, Input, TemplateRef, OnInit } from "@angular/core";
import { ApplicationService } from "../services/application.service";

@Directive({
  selector: "[modalContentId]"
})
export class ModalContentDirective implements OnInit {
  @Input() modalContentId: number;

  constructor(
    private appService: ApplicationService,
    private template: TemplateRef<any>
  ) {}

  ngOnInit() {
    this.appService.registerView(
      this.modalContentId,
      this.template.createEmbeddedView({})
    );
    this.appService.updateModalView(this.modalContentId);
  }
}

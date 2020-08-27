import {
  Directive,
  Input,
  TemplateRef,
  OnInit,
  OnDestroy,
  EmbeddedViewRef,
} from '@angular/core';
import { ViewManagementService } from '../services/view-management.service';

@Directive({
  selector: '[appModalContentId]',
})
export class ModalContentDirective implements OnInit, OnDestroy {
  private view: EmbeddedViewRef<any>;

  constructor(
    private viewService: ViewManagementService,
    private template: TemplateRef<any>
  ) { }

  ngOnInit() {
    this.view = this.template.createEmbeddedView(null);
  }

  ngOnDestroy() {
    this.view.destroy();
  }
}

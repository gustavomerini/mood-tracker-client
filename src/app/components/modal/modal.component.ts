import {
  Component,
  ViewEncapsulation,
  HostBinding,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ViewManagementService } from '../../services/view-management.service';

@Component({
  selector: 'moods-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ModalComponent {
  constructor(private viewService: ViewManagementService) {}

  @ViewChild('content', { read: ViewContainerRef })
  content: ViewContainerRef;

  @HostBinding('class.hidden')
  hidden = true;

  hide() {
    this.content.detach();
    this.hidden = true;
  }

  show(viewId: number) {
    this.content.insert(this.viewService.getView(viewId));
    this.hidden = false;
  }
}

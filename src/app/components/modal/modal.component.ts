import {
  Component,
  ViewEncapsulation,
  HostBinding,
  ViewChild,
  ViewContainerRef,
  OnDestroy,
} from '@angular/core';
import { ViewManagementService } from '../../services/view-management.service';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'moods-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ModalComponent implements OnDestroy {
  constructor(private viewService: ViewManagementService) {
    this.hidden$$.next(true);
    this.hiddenSubscription = this.hidden$$.subscribe(h => this.hidden = h);
  }

  @ViewChild('content', { read: ViewContainerRef })
  content: ViewContainerRef;

  @HostBinding('class.hidden')
  hidden: boolean;

  private hidden$$ = new Subject<boolean>();
  hidden$: Observable<boolean> = this.hidden$$.asObservable();

  private hiddenSubscription: Subscription;

  hide() {
    this.content.detach();
    this.hidden$$.next(true);
  }

  show(viewId: number) {
    this.content.insert(this.viewService.getView(viewId));
    this.hidden$$.next(false);
  }

  ngOnDestroy() {
    this.hiddenSubscription.unsubscribe();
  }
}

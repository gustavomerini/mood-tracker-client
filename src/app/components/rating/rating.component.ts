import { Component, OnInit, ViewEncapsulation, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

type Rating = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

@Component({
  selector: 'moods-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => {
        return RatingComponent;
      }),
      multi: true
    }
  ]
})
export class RatingComponent implements OnInit, ControlValueAccessor {

  constructor(private domSanitizer: DomSanitizer) { }
  value: Rating;

  readonly icons: SafeResourceUrl[] = [...Array(10)].map((_, idx) => {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/mood_emoticons/${idx + 1}.svg`);
  });

  onChange: any = () => undefined;
  onTouch: any = () => undefined;

  isActive(idx: number): boolean {
    return idx + 1 === this.value;
  }

  select(idx: number): void {
    this.writeValue((idx + 1) as Rating);
  }

  writeValue(value: Rating) {
    this.value = value;
    this.onChange(value);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  ngOnInit(): void {
  }

}

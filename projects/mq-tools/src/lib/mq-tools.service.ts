import { Injectable } from "@angular/core";
import { fromEvent, Observable } from "rxjs";
import { map } from "rxjs/operators";

export type BreakpointKeys = Array<string>;

export type Breakpoints = { [key: string]: number };

@Injectable({
  providedIn: "root"
})
export class MqToolsService {
  enabled = false;
  keys: BreakpointKeys = ["small", "medium", "large", "xlarge", "xxlarge"];

  private _breakpoints: Breakpoints;

  current$: Observable<string>;

  constructor() {
    this._parseRootCssVariables();
    if (this.enabled) {
      this.current$ = fromEvent(window, "resize").pipe(
        map(_ => {
          const windowWidth = window.innerWidth;
          let lastbp: number;
          return this.keys.reduce((acc, k) => {
            let key: string;
            if (acc == null && lastbp == null) {
              key = k;
              lastbp = this._breakpoints[k];
            } else if (
              windowWidth >= lastbp &&
              windowWidth >= this._breakpoints[k]
            ) {
              key = k;
              lastbp = this._breakpoints[k];
            } else {
              key = acc;
            }
            return key;
          }, undefined);
        })
      );
    }
  }

  private _parseRootCssVariables() {
    const documentStyles: CSSStyleSheet = <CSSStyleSheet>(
      document.styleSheets[0]
    );
    const rootRules: CSSStyleRule | undefined = (Array.from(
      documentStyles.cssRules
    ) as Array<CSSStyleRule>).find(r => r.selectorText === ":root");
    if (rootRules == undefined) {
      console.warn(
        `Couldn't find :root style rules, MqToolsService remains disabled.`
      );
      return;
    }
    const rootCssText: string = rootRules.style.cssText;
    const breakpointVars: Array<string> = rootCssText
      .split(/\s*;\s*/)
      .filter(s => s.startsWith("--breakpoint-"));
    const breakpoints: Breakpoints = {};
    breakpointVars.forEach(bps => {
      const [v, px] = bps.split(/\s*:\s*/);
      const regex = new RegExp(this.keys.join("|"));
      const match = v.match(regex);
      const str = match ? match[0] : undefined;
      breakpoints[str] = parseInt(px);
    });
    console.log(breakpoints);
    if (
      Object.keys(breakpoints)
        .sort()
        .join(",") !== [...this.keys].sort().join(",")
    ) {
      console.warn(
        `Not all --breakpoint css variables defined. MqToolsService remains disabled`
      );
    } else {
      this._breakpoints = breakpoints;
      this.enabled = true;
    }
  }
}

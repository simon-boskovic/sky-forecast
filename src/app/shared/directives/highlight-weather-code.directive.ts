import { Directive, ElementRef, Input, inject } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[highlightWeatherCode]',
})
export class HighlightWeatherCodeDirective {
  private _elRef = inject(ElementRef);
  @Input() set highlightWeatherCode(value: string) {
    if (value) {
      this.highlightText(value);
    }
  }

  private highlightText(value: string): void {
    const regex = /\b(BKN|FEW|SCT)(\d{3})\b/g;
    const formattedText = value.replace(regex, (match, prefix, number) => {
      const num = +number;
      const color = num <= 30 ? 'blue' : 'red';
      return `<span style="color: ${color};">${match}</span>`;
    });
    this._elRef.nativeElement.innerHTML = formattedText;
  }
}

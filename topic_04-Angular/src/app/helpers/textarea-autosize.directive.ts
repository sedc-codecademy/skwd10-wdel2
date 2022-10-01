import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appTextareaAutosize]',
})
export class TextareaAutosizeDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}

  @HostListener(':input')
  onInput() {
    this.resizeArea();
  }

  ngOnInit(): void {
    if (this.elementRef.nativeElement.scrollHeight) {
      setTimeout(() => this.resizeArea());
    }
  }

  resizeArea() {
    this.elementRef.nativeElement.style.height = '0';
    this.elementRef.nativeElement.style.height =
      this.elementRef.nativeElement.scrollHeight + 10 + 'px';
  }
}

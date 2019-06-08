import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appItemHover]'
})
export class MagazineItemDirective {
  @HostBinding('class.active') isHovered = false;

  @HostListener('mouseover') toggleHover() {
    this.isHovered = true;
  }
  @HostListener('mouseout') unToggleHover() {
    this.isHovered = false;
  }
}

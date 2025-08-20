import { Directive, HostBinding } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appButton]',
})
export class ButtonDirective {
  @HostBinding('class') get hostClasses(): string {
    return 'px-4 py-1 text-white rounded shadow transition-colors cursor-pointer';
  }
}

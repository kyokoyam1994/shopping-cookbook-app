import { Directive, ViewContainerRef } from '@angular/core';

// Directive that gets a reference to the component in which the directive is used
@Directive({
    selector: '[appPlaceholder]'
})
export class PlaceholderDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
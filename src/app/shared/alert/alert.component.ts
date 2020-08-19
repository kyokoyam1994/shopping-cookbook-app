import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent {
    @Input() message: string;// Input makes field settable from outside HTML
    @Output() close = new EventEmitter<void>(); // Output makes events listenable from outside HTML

    onClose() {
        this.close.emit();
    }
}
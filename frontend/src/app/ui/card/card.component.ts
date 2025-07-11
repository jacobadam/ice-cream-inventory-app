import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div
      class="bg-white border border-gray-200 rounded-lg shadow p-5 h-80 overflow-auto"
    >
      @if (title) {
      <h2
        class="text-center sm:text-left text-sm text-gray-500 uppercase tracking-wide mb-3"
      >
        {{ title }}
      </h2>
      }
      <ng-content></ng-content>
    </div>
  `,
})
export class CardComponent {
  @Input() title?: string;
}

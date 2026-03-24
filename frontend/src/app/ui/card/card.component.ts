import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div
      class="bg-white border border-gray-200 rounded-lg shadow p-5 h-80 flex flex-col"
    >
      @if (title) {
        <h2
          class="text-left text-sm text-gray-500 uppercase tracking-wide mb-3"
        >
          {{ title }}
        </h2>
      }

      <div class="flex-1 min-h-0 overflow-y-auto">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class CardComponent {
  @Input() title?: string;
}

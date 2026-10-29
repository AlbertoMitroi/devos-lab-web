import { KeyValuePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { PortfolioService, PortfolioSummary } from './portfolio.service';

@Component({
  selector: 'app-portfolio',
  imports: [KeyValuePipe],
  template: `
    <h2>Portfolio</h2>
    @if (summary(); as s) {
      <p>Active leases: {{ s.activeLeases }}</p>
      <ul>
        @for (entry of s.flowsByStatus | keyvalue; track entry.key) {
          <li>{{ entry.key }}: {{ entry.value }}</li>
        }
      </ul>
    }
  `,
})
export class Portfolio {
  protected readonly summary = signal<PortfolioSummary | null>(null);

  constructor() {
    inject(PortfolioService).summary().subscribe((s) => this.summary.set(s));
  }
}

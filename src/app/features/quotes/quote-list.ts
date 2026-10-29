import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FlowReadModel } from '../../core/models/flow';
import { QuotesService } from './quotes.service';

@Component({
  selector: 'app-quote-list',
  imports: [CurrencyPipe, RouterLink],
  template: `
    <h2>Quotes</h2>
    <ul>
      @for (flow of quotes(); track flow.flowId) {
        <li><a [routerLink]="[flow.flowId]">{{ flow.applicantName }}</a>: {{ flow.monthlyPayment | currency: 'EUR' }}, {{ flow.status }}</li>
      }
    </ul>
  `,
})
export class QuoteList {
  private readonly service = inject(QuotesService);

  protected readonly quotes = signal<FlowReadModel[]>([]);

  constructor() {
    this.service.list().subscribe((rows) => this.quotes.set(rows));
  }
}

import { Component, OnInit, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlowView } from '../../core/models/flow';
import { QuotesService } from './quotes.service';

@Component({
  selector: 'app-quote-detail',
  imports: [FormsModule],
  template: `
    @if (flow(); as f) {
      <h2>Quote for {{ f.data['applicantName'] }}</h2>
      <p>{{ f.data['monthlyPayment'] }} per month over {{ f.data['termMonths'] }} months ({{ f.status }})</p>
      @if (f.availableActions.includes('Recalculate')) {
        <input type="number" name="termMonths" [(ngModel)]="termMonths" />
        <button (click)="recalculate()">Recalculate</button>
      }
      @if (f.openTasks.length > 0) {
        <button (click)="answer(true)">Accept</button>
        <button (click)="answer(false)">Decline</button>
      }
    }
  `,
})
export class QuoteDetail implements OnInit {
  private readonly service = inject(QuotesService);

  readonly flowId = input.required<string>();
  protected readonly flow = signal<FlowView | null>(null);
  protected termMonths = 48;

  ngOnInit(): void {
    this.service.get(this.flowId()).subscribe((f) => this.flow.set(f));
  }

  recalculate(): void {
    this.service.recalculate(this.flowId(), this.termMonths).subscribe((f) => this.flow.set(f));
  }

  answer(accept: boolean): void {
    this.service.accept(this.flowId(), accept).subscribe((f) => this.flow.set(f));
  }
}

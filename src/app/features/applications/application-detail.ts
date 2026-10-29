import { Component, OnInit, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlowView } from '../../core/models/flow';
import { ApplicationsService } from './applications.service';

@Component({
  selector: 'app-application-detail',
  imports: [FormsModule],
  template: `
    @if (flow(); as f) {
      <h2>{{ f.data['applicantName'] }}</h2>
      <p>Status: {{ f.status }}</p>
      <p>{{ f.data['assetType'] }}, {{ f.data['assetValue'] }}, {{ f.data['termMonths'] }} months</p>
      @if (hasOpenTask(f, 'ReviewApplication')) {
        <textarea name="comment" [(ngModel)]="comment"></textarea>
        <button (click)="review(true)">Approve</button>
        <button (click)="review(false)">Decline</button>
      }
      @if (f.availableActions.includes('Withdraw')) {
        <button (click)="withdraw()">Withdraw</button>
      }
    }
  `,
})
export class ApplicationDetail implements OnInit {
  private readonly service = inject(ApplicationsService);

  readonly flowId = input.required<string>();
  protected readonly flow = signal<FlowView | null>(null);
  protected comment = '';

  ngOnInit(): void {
    this.service.get(this.flowId()).subscribe((f) => this.flow.set(f));
  }

  protected hasOpenTask(flow: FlowView, taskId: string): boolean {
    return flow.openTasks.some((t) => t.taskId === taskId);
  }

  review(approve: boolean): void {
    this.service.review(this.flowId(), approve, this.comment).subscribe((f) => this.flow.set(f));
  }

  withdraw(): void {
    this.service.withdraw(this.flowId()).subscribe((f) => this.flow.set(f));
  }
}

import { Component, OnInit, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlowView } from '../../core/models/flow';
import { LeaseDocument, LeasesService } from './leases.service';

@Component({
  selector: 'app-lease-detail',
  imports: [FormsModule],
  template: `
    @if (flow(); as f) {
      <h2>{{ f.data['contractNumber'] }}</h2>
      <p>Status: {{ f.status }}</p>
      @if (f.openTasks.some(isSignTask)) {
        <input name="signedBy" [(ngModel)]="signedBy" placeholder="Signed by" />
        <button (click)="sign()">Sign contract</button>
      }
      @if (lease(); as l) {
        <p>Active since {{ l.activatedAt }}, signed by {{ l.signedBy }}</p>
      }
    }
  `,
})
export class LeaseDetail implements OnInit {
  private readonly service = inject(LeasesService);

  readonly flowId = input.required<string>();
  protected readonly flow = signal<FlowView | null>(null);
  protected readonly lease = signal<LeaseDocument | null>(null);
  protected signedBy = '';
  protected readonly isSignTask = (t: { taskId: string }) => t.taskId === 'SignContract';

  ngOnInit(): void {
    this.service.get(this.flowId()).subscribe((f) => {
      this.flow.set(f);
      if (f.status === 'LeaseActive') {
        this.service.document(this.flowId()).subscribe((l) => this.lease.set(l));
      }
    });
  }

  sign(): void {
    this.service.sign(this.flowId(), this.signedBy).subscribe((f) => this.flow.set(f));
  }
}

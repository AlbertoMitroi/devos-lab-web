import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FlowReadModel } from '../../core/models/flow';
import { LeasingHubService } from '../../core/realtime/leasing-hub.service';
import { ApplicationsService } from './applications.service';

@Component({
  selector: 'app-application-list',
  imports: [FormsModule, RouterLink],
  template: `
    <h2>Applications</h2>
    <form (ngSubmit)="load()">
      <input name="text" [(ngModel)]="text" placeholder="Applicant, asset" />
      <button type="submit">Search</button>
    </form>
    <table>
      <thead><tr><th>Applicant</th><th>Asset</th><th>Status</th><th>Open tasks</th></tr></thead>
      <tbody>
        @for (flow of applications(); track flow.flowId) {
          <tr>
            <td><a [routerLink]="[flow.flowId]">{{ flow.applicantName }}</a></td>
            <td>{{ flow.assetType }}</td>
            <td>{{ flow.status }}</td>
            <td>{{ flow.openTasks.join(', ') }}</td>
          </tr>
        } @empty {
          <tr><td colspan="4">No applications.</td></tr>
        }
      </tbody>
    </table>
  `,
})
export class ApplicationList {
  private readonly service = inject(ApplicationsService);
  private readonly hub = inject(LeasingHubService);

  protected readonly applications = signal<FlowReadModel[]>([]);
  protected text = '';

  constructor() {
    this.load();
    // A pushed update of an application replaces its row, or adds it.
    effect(() => {
      const update = this.hub.lastFlowUpdate();
      if (update?.processId === 'Application') {
        this.applications.update((rows) => [update, ...rows.filter((r) => r.flowId !== update.flowId)]);
      }
    });
  }

  load(): void {
    this.service.search(undefined, this.text).subscribe((rows) => this.applications.set(rows));
  }
}

import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FlowReadModel } from '../../core/models/flow';
import { LeasesService } from './leases.service';

@Component({
  selector: 'app-lease-list',
  imports: [FormsModule, RouterLink],
  template: `
    <h2>Leases</h2>
    <form (ngSubmit)="load()">
      <input name="text" [(ngModel)]="text" placeholder="Contract, applicant" />
      <button type="submit">Search</button>
    </form>
    <ul>
      @for (flow of leases(); track flow.flowId) {
        <li><a [routerLink]="[flow.flowId]">{{ flow.contractNumber }}</a> {{ flow.applicantName }} ({{ flow.status }})</li>
      }
    </ul>
  `,
})
export class LeaseList {
  private readonly service = inject(LeasesService);

  protected readonly leases = signal<FlowReadModel[]>([]);
  protected text = '';

  constructor() {
    this.load();
  }

  load(): void {
    this.service.search(this.text).subscribe((rows) => this.leases.set(rows));
  }
}

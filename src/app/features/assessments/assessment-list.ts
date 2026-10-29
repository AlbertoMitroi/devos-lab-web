import { Component, inject, signal } from '@angular/core';
import { FlowReadModel } from '../../core/models/flow';
import { AssessmentsService } from './assessments.service';

@Component({
  selector: 'app-assessment-list',
  template: `
    <h2>Risk assessments</h2>
    <ul>
      @for (flow of assessments(); track flow.flowId) {
        <li>
          {{ flow.applicantName }}: {{ flow.status }}
          @if (flow.openTasks.includes('AssessRisk')) {
            @for (grade of grades; track grade) {
              <button (click)="assess(flow.flowId, grade)">{{ grade }}</button>
            }
          }
        </li>
      }
    </ul>
  `,
})
export class AssessmentList {
  private readonly service = inject(AssessmentsService);

  protected readonly assessments = signal<FlowReadModel[]>([]);
  protected readonly grades = ['A', 'B', 'C', 'D'];

  constructor() {
    this.load();
  }

  load(): void {
    this.service.list().subscribe((rows) => this.assessments.set(rows));
  }

  assess(flowId: string, grade: string): void {
    this.service.assess(flowId, grade).subscribe(() => this.load());
  }
}

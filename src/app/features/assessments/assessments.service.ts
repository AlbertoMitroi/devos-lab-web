import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FlowReadModel, FlowView } from '../../core/models/flow';

@Injectable({ providedIn: 'root' })
export class AssessmentsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/v1/assessments`;

  list(): Observable<FlowReadModel[]> {
    return this.http.get<FlowReadModel[]>(this.baseUrl);
  }

  assess(flowId: string, riskGrade: string): Observable<FlowView> {
    return this.http.post<FlowView>(`${this.baseUrl}/${flowId}/assess`, { riskGrade });
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FlowReadModel, FlowView } from '../../core/models/flow';

@Injectable({ providedIn: 'root' })
export class ApplicationsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/v1/applications`;

  search(status?: string, text?: string): Observable<FlowReadModel[]> {
    let params = new HttpParams();
    if (status) {
      params = params.set('status', status);
    }
    if (text) {
      params = params.set('q', text);
    }
    return this.http.get<FlowReadModel[]>(this.baseUrl, { params });
  }

  get(flowId: string): Observable<FlowView> {
    return this.http.get<FlowView>(`${this.baseUrl}/${flowId}`);
  }

  review(flowId: string, approve: boolean, comment?: string): Observable<FlowView> {
    return this.http.post<FlowView>(`${this.baseUrl}/${flowId}/review`, { approve, comment: comment ?? null });
  }

  withdraw(flowId: string): Observable<FlowView> {
    return this.http.post<FlowView>(`${this.baseUrl}/${flowId}/actions/withdraw`, {});
  }
}

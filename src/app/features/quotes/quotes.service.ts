import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FlowReadModel, FlowView } from '../../core/models/flow';

@Injectable({ providedIn: 'root' })
export class QuotesService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/v1/quotes`;

  list(): Observable<FlowReadModel[]> {
    return this.http.get<FlowReadModel[]>(this.baseUrl);
  }

  get(flowId: string): Observable<FlowView> {
    return this.http.get<FlowView>(`${this.baseUrl}/${flowId}`);
  }

  accept(flowId: string, accept: boolean): Observable<FlowView> {
    return this.http.post<FlowView>(`${this.baseUrl}/${flowId}/accept`, { accept });
  }

  recalculate(flowId: string, termMonths: number): Observable<FlowView> {
    return this.http.post<FlowView>(`${this.baseUrl}/${flowId}/recalculate`, { termMonths });
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FlowReadModel, FlowView } from '../../core/models/flow';

export interface LeaseDocument {
  id: string;
  contractNumber: string;
  applicationId: string;
  applicantName: string;
  companyNumber: string;
  assetType: string;
  monthlyPayment: number;
  termMonths: number;
  signedBy: string;
  activatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class LeasesService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/v1/leases`;

  search(text?: string): Observable<FlowReadModel[]> {
    const params = text ? new HttpParams().set('q', text) : undefined;
    return this.http.get<FlowReadModel[]>(this.baseUrl, { params });
  }

  get(flowId: string): Observable<FlowView> {
    return this.http.get<FlowView>(`${this.baseUrl}/${flowId}`);
  }

  document(flowId: string): Observable<LeaseDocument> {
    return this.http.get<LeaseDocument>(`${this.baseUrl}/${flowId}/document`);
  }

  sign(flowId: string, signedBy: string): Observable<FlowView> {
    return this.http.post<FlowView>(`${this.baseUrl}/${flowId}/sign`, { signedBy });
  }
}

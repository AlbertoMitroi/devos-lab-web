import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface PortfolioSummary {
  id: string;
  flowsByStatus: Record<string, number>;
  activeLeases: number;
}

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private readonly http = inject(HttpClient);

  summary(): Observable<PortfolioSummary> {
    return this.http.get<PortfolioSummary>(`${environment.apiUrl}/v1/admin/portfolio`);
  }
}

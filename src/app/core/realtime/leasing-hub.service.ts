import { Injectable, InjectionToken, inject, signal } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { environment } from '../../../environments/environment';
import { AuthTokenService } from '../auth/auth-token.service';
import { FlowReadModel } from '../models/flow';

export interface TaskAssigned {
  id: string;
  processId: string;
  taskId: string;
  name: string;
}

export const HUB_CONNECTION_FACTORY = new InjectionToken<() => HubConnection>('HUB_CONNECTION_FACTORY', {
  providedIn: 'root',
  factory: () => {
    const tokens = inject(AuthTokenService);
    return () =>
      new HubConnectionBuilder()
        .withUrl(`${environment.apiUrl}${environment.hubPath}`, { accessTokenFactory: () => tokens.token() ?? '' })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Warning)
        .build();
  },
});

/** Receives the pushes of the leasing backend: flowUpdated (to everyone) and taskAssigned (to team members). */
@Injectable({ providedIn: 'root' })
export class LeasingHubService {
  private readonly createConnection = inject(HUB_CONNECTION_FACTORY);
  private connection: HubConnection | null = null;

  readonly lastFlowUpdate = signal<FlowReadModel | null>(null);
  readonly assignedTasks = signal<TaskAssigned[]>([]);

  async start(): Promise<void> {
    if (this.connection) {
      return;
    }
    const connection = this.createConnection();
    connection.on('flowUpdated', (flow: FlowReadModel) => this.lastFlowUpdate.set(flow));
    connection.on('taskAssigned', (task: TaskAssigned) => this.assignedTasks.update((tasks) => [...tasks, task]));
    this.connection = connection;
    await connection.start();
  }

  async stop(): Promise<void> {
    await this.connection?.stop();
    this.connection = null;
  }
}

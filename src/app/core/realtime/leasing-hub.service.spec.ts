import { TestBed } from '@angular/core/testing';
import { HubConnection } from '@microsoft/signalr';
import { FlowReadModel } from '../models/flow';
import { HUB_CONNECTION_FACTORY, LeasingHubService } from './leasing-hub.service';

describe('LeasingHubService', () => {
  const handlers = new Map<string, (payload: unknown) => void>();
  const connection = {
    on: vi.fn((method: string, handler: (payload: unknown) => void) => handlers.set(method, handler)),
    start: vi.fn().mockResolvedValue(undefined),
    stop: vi.fn().mockResolvedValue(undefined),
  };

  beforeEach(() => {
    handlers.clear();
    TestBed.configureTestingModule({
      providers: [{ provide: HUB_CONNECTION_FACTORY, useValue: () => connection as unknown as HubConnection }],
    });
  });

  it('subscribes to flowUpdated and taskAssigned and exposes the pushes', async () => {
    const hub = TestBed.inject(LeasingHubService);
    await hub.start();

    expect([...handlers.keys()]).toEqual(['flowUpdated', 'taskAssigned']);
    handlers.get('flowUpdated')!({ flowId: 'f-1', processId: 'Application', status: 'InProgress' } as FlowReadModel);
    handlers.get('taskAssigned')!({ id: 'f-1', processId: 'Application', taskId: 'ReviewApplication', name: 'Review application' });

    expect(hub.lastFlowUpdate()?.flowId).toBe('f-1');
    expect(hub.assignedTasks().map((t) => t.taskId)).toEqual(['ReviewApplication']);
  });
});

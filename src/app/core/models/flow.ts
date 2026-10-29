/** Read model of a flow, as indexed in Elasticsearch by the backend (lists). */
export interface FlowReadModel {
  flowId: string;
  processId: string;
  status: string;
  parentFlowId: string | null;
  openTasks: string[];
  availableActions: string[];
  applicantName: string | null;
  assetType: string | null;
  monthlyPayment: number | null;
  contractNumber: string | null;
  version: number;
  updatedAt: string;
}

export interface OpenTask {
  taskId: string;
  name: string;
  kind: string;
  lane: string | null;
  workTeam: string | null;
}

/** Current state of one flow, from the event store (details). */
export interface FlowView {
  flowId: string;
  processId: string;
  status: string;
  parentFlowId: string | null;
  openTasks: OpenTask[];
  availableActions: string[];
  data: Record<string, string>;
  version: number;
}

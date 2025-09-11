export interface DevplanModel {
  id: number;
  value: string;
  priority?: Priority | null;
  prioritys: Priority[];
  dateTime?: Date | null;
  remark?: string | null;
}

export interface Priority {
  id: number;
  name: string;
}

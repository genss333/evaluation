export interface DevplanModel {
  id: number;
  priority?: Priority | null;
  prioritys: Priority[];
  dateTime?: Date | null;
  remark?: string | null;
}

export interface Priority {
  id: number;
  name: string;
}

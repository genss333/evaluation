export interface Devplan {
  id: number;
  plan: {
    value: string;
    disable: boolean;
  };
  priority?: {
    value: Priority | null;
    disable: boolean;
  };
  prioritys: Priority[];
  dateTime?: {
    value: Date | null;
    disable: boolean;
  };
  remark?: {
    value: string | null;
    disable: boolean;
  };
}

export interface Priority {
  id: number;
  name: string;
}

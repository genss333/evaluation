export interface MoreProbationModel {
  id: number;
  title: string;
  value: {
    id: number;
    value: string;
    disable: boolean;
  }[];
}

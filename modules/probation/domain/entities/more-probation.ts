export interface MoreProbation {
  id: number;
  title: string;
  value: {
    id: number;
    value: string;
    disable: boolean;
  }[];
}

export interface TimeAttandanceModel {
  id: number;
  title: string;
  value: string;
  disable: boolean;
}

export interface ProbationTimeModel {
  title: String;
  desc: string;
  list: TimeAttandanceModel[];
}

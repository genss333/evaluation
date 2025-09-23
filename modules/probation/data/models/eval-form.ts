export interface EvalForm {
  id: number;
  code: string;
  title_th: string;
  title_en: string;
  kpi_weight: number;
  comp_weight: number;
  ta_weight: number;
  total_weight: number;
  calc_method: number;
  score_scheme: number;
  kpi_cfg_start: Date;
  kpi_cfg_end: Date;
  eval_start: Date;
  eval_end: Date;
  other_lv_start: Date;
  other_lv_end: Date;
  annual_lv_start: Date;
  annual_lv_end: Date;
  remark: string;
}

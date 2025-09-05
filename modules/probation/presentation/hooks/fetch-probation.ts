import { ApiClient } from "@/lib/api-client";
import * as model from "@/modules/probation/data/models/probation-kpi-model";
import { queryOptions } from "@tanstack/react-query";
import { NextResponse } from "next/server";
import { CompetencyModel } from "../../data/models/probation-competency-model";
import { ProbationModel } from "../../data/models/probation-model";
import { ProbationTableModel } from "../../data/models/probation-table-model";
import { CompetencyService } from "../../data/services/competency-service";
import { KpiService } from "../../data/services/kpi-service";
import { ProbationDetailService } from "../../data/services/probation-detail-service";
import { CometencyRepository } from "../../domain/repositories/competency-repository";
import { KpiRepository } from "../../domain/repositories/kpi-repository";
import { ProbationDetailRepository } from "../../domain/repositories/probation-detail-repository";

export const probationQueryKery = ["probation"];
export const kpiQueryKery = ["probation-kpi"];
export const competencyQueryKery = ["probation-competency"];

export const prefetchProbation = () => {
  const api = new ApiClient();
  const service = new ProbationDetailService<NextResponse>(api);
  const repo = new ProbationDetailRepository<ProbationModel>(service);

  return queryOptions<ProbationModel>({
    queryKey: probationQueryKery,
    queryFn: async () => {
      const data = await repo.call();
      return data;
    },
  });
};

export const useFetchKpi = () => {
  const api = new ApiClient();
  const service = new KpiService<NextResponse>(api);
  const repo = new KpiRepository(service);

  return queryOptions<ProbationTableModel<model.Kpi>>({
    queryKey: kpiQueryKery,
    queryFn: async () => {
      const data = await repo.call();
      return data;
    },
  });
};

export const useFetchCompetency = () => {
  const api = new ApiClient();
  const service = new CompetencyService<NextResponse>(api);
  const repo = new CometencyRepository(service);

  return queryOptions<ProbationTableModel<CompetencyModel>>({
    queryKey: competencyQueryKery,
    queryFn: async () => {
      const data = await repo.call();
      return data;
    },
  });
};

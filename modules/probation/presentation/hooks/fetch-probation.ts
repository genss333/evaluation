import { ApiClient } from "@/lib/api-client";
import * as kpiModel from "@/modules/probation/data/models/probation-kpi-model";
import { queryOptions } from "@tanstack/react-query";
import { NextResponse } from "next/server";
import { ProbationModel } from "../../data/models/probation-model";
import { KpiService } from "../../data/services/kpi-service";
import { ProbationDetailService } from "../../data/services/probation-detail-service";
import { KpiRepository } from "../../domain/repositories/kpi-repository";
import { ProbationDetailRepository } from "../../domain/repositories/probation-detail-repository";

export const probationQueryKery = ["probation"];
export const kpiQueryKery = ["probation-kpi"];

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

  return queryOptions<kpiModel.ProbationKpi>({
    queryKey: kpiQueryKery,
    queryFn: async () => {
      const data = await repo.call();
      return data;
    },
  });
};

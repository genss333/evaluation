import { ApiClient } from "@/lib/api-client";
import * as model from "@/modules/probation/data/models/probation-kpi-model";
import { SumScore } from "@/modules/probation/data/models/probation-kpi-model";
import { queryOptions } from "@tanstack/react-query";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { NextResponse } from "next/server";
import { MoreProbationModel } from "../../data/models/more-probation-model";
import { CompetencyModel } from "../../data/models/probation-competency-model";
import { DevplanModel } from "../../data/models/probation-devplan-model";
import { ProbationModel } from "../../data/models/probation-model";
import { ProbationTableModel } from "../../data/models/probation-table-model";
import { TimeAttandanceModel } from "../../data/models/time-attandance-model";
import { CompetencyService } from "../../data/services/competency-service";
import { DevplanService } from "../../data/services/devplan-service";
import { KpiService } from "../../data/services/kpi-service";
import { MoreProbationService } from "../../data/services/more-probation-service";
import { ProbationDetailService } from "../../data/services/probation-detail-service";
import { TimeAttService } from "../../data/services/time-att-service";
import { CometencyRepository } from "../../domain/repositories/competency-repository";
import { DevplanRepository } from "../../domain/repositories/devplan-repository";
import { KpiRepository } from "../../domain/repositories/kpi-repository";
import { MoreProbationRepository } from "../../domain/repositories/more-probation-repository";
import { ProbationDetailRepository } from "../../domain/repositories/probation-detail-repository";
import { TimeAttandanceRepository } from "../../domain/repositories/time-attandance-repository";

export const probationQueryKery = "probation";
export const kpiQueryKery = ["probation-kpi"];
export const competencyQueryKery = ["probation-competency"];
export const timeAttQueryKery = ["probation-time"];
export const devplanQueryKery = ["probation-devplan"];
export const moreQueryKery = ["probation-more"];

export const useFetchProbation = ({
  cookieStore,
  initialData,
  personCode,
}: {
  cookieStore?: ReadonlyRequestCookies;
  initialData?: ProbationModel;
  personCode?: string;
  isSelectemp?: boolean;
}) => {
  const api = new ApiClient(cookieStore);
  const service = new ProbationDetailService<NextResponse>(api);
  const repo = new ProbationDetailRepository<ProbationModel>(service);

  return queryOptions<ProbationModel>({
    queryKey: [probationQueryKery],
    initialData,
    queryFn: () => repo.call(personCode),
  });
};

export const useFetchKpi = () => {
  const api = new ApiClient();
  const service = new KpiService<NextResponse>(api);
  const repo = new KpiRepository(service);

  return queryOptions<ProbationTableModel<model.Kpi> & { sums?: SumScore[] }>({
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

export const useFetchProbationTime = () => {
  const api = new ApiClient();
  const service = new TimeAttService<NextResponse>(api);
  const repo = new TimeAttandanceRepository(service);

  return queryOptions<ProbationTableModel<TimeAttandanceModel>>({
    queryKey: timeAttQueryKery,
    queryFn: async () => {
      const data = await repo.call();
      return data;
    },
  });
};

export const useFetchDevplan = () => {
  const api = new ApiClient();
  const service = new DevplanService<NextResponse>(api);
  const repo = new DevplanRepository(service);

  return queryOptions<ProbationTableModel<DevplanModel>>({
    queryKey: devplanQueryKery,
    queryFn: async () => {
      const data = await repo.call();
      return data;
    },
  });
};

export const useFetchMoreProbation = () => {
  const api = new ApiClient();
  const service = new MoreProbationService<NextResponse>(api);
  const repo = new MoreProbationRepository(service);

  return queryOptions<ProbationTableModel<MoreProbationModel>>({
    queryKey: moreQueryKery,
    queryFn: async () => {
      const data = await repo.call();
      return data;
    },
  });
};

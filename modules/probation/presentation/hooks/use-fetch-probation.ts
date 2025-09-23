import { ApiClient } from "@/lib/api-client";
import { queryOptions } from "@tanstack/react-query";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { NextResponse } from "next/server";
import { DevplanService } from "../../data/services/devplan-service";
import { FormDataService } from "../../data/services/form-data-service";
import { MoreProbationService } from "../../data/services/more-probation-service";
import { ProbationDetailService } from "../../data/services/probation-detail-service";
import { TimeAttService } from "../../data/services/time-att-service";
import { EvalFormData } from "../../domain/entities/eval-form-data";
import { MoreProbation } from "../../domain/entities/more-probation";
import { Probation } from "../../domain/entities/probation";
import { Devplan } from "../../domain/entities/probation-devplan";
import { ProbationTable } from "../../domain/entities/probation-table";
import { TimeAttandance } from "../../domain/entities/time-attandance";
import { DevplanRepository } from "../../domain/repositories/devplan-repository";
import { FormDataRepository } from "../../domain/repositories/formdata-repository";
import { MoreProbationRepository } from "../../domain/repositories/more-probation-repository";
import { ProbationDetailRepository } from "../../domain/repositories/probation-detail-repository";
import { TimeAttandanceRepository } from "../../domain/repositories/time-attandance-repository";

export const probationQueryKery = "probation";
export const kpiQueryKery = ["probation-kpi"];
export const competencyQueryKery = ["probation-competency"];
export const timeAttQueryKery = ["probation-time"];
export const devplanQueryKery = ["probation-devplan"];
export const moreQueryKery = ["probation-more"];

export const probationQueryOptions = ({
  cookieStore,
  initialData,
  personCode,
}: {
  cookieStore?: ReadonlyRequestCookies;
  initialData?: Probation;
  personCode?: string;
  isSelectemp?: boolean;
}) => {
  const api = new ApiClient({ cookieStore });
  const service = new ProbationDetailService<NextResponse>(api);
  const repo = new ProbationDetailRepository(service);

  return queryOptions<Probation>({
    queryKey: [probationQueryKery],
    initialData,
    queryFn: () => repo.call(personCode),
  });
};

export const evalFormDataQueryOptions = ({ formId }: { formId: number }) => {
  const api = new ApiClient();
  const service = new FormDataService<NextResponse>(api);
  const repo = new FormDataRepository(service);

  return queryOptions<EvalFormData>({
    queryKey: ["evalForm"],
    queryFn: async () => {
      const data = await repo.call(formId);
      return data;
    },
  });
};

export const useFetchProbationTime = () => {
  const api = new ApiClient();
  const service = new TimeAttService<NextResponse>(api);
  const repo = new TimeAttandanceRepository(service);

  return queryOptions<TimeAttandance>({
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

  return queryOptions<ProbationTable<Devplan>>({
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

  return queryOptions<ProbationTable<MoreProbation>>({
    queryKey: moreQueryKery,
    queryFn: async () => {
      const data = await repo.call();
      return data;
    },
  });
};

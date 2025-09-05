import { ApiClient } from "@/lib/api-client";
import { queryOptions } from "@tanstack/react-query";
import { NextResponse } from "next/server";
import { ProbationModel } from "../../data/models/probation-model";
import { ProbationDetailService } from "../../data/services/probation-detail-service";
import { ProbationDetailRepository } from "../../domain/repositories/probation-detail-repository";

export const probationQueryKery = ["probation"];

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

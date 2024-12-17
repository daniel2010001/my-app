import { createAxiosCall } from "@/lib";
import { TraceRequest, TraceResponse } from "@/models";

export const traceRoute = (data: TraceRequest) =>
  createAxiosCall<TraceResponse[], TraceRequest>("POST", "/api/tracert", data);

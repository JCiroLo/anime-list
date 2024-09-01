import { Response } from ".";
import { AnimeModel } from "../models";

import { type TResponse } from "./Response";

type TRequestModel = typeof AnimeModel;
type TRequestURL = string | string[];
type TRequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type TRequestOptions = {
  headers?: Record<string, string>;
};

const headers: TRequestOptions["headers"] = {
  "Content-Type": "application/vnd.api+json",
};

class Network {
  model: TRequestModel;
  API_URL: string;

  constructor(model: TRequestModel) {
    this.model = model;
    this.API_URL = import.meta.env.VITE_API_URL;
  }

  async request<M>(url: TRequestURL, method: TRequestMethod, options?: TRequestOptions): Promise<TResponse<M>> {
    try {
      const parsedUrl = Array.isArray(url) ? url.join("/") : url;

      const response = await (
        await fetch(this.API_URL + parsedUrl, {
          method,
          headers: { ...headers, ...options?.headers },
        })
      ).json();

      if (Array.isArray(response?.data)) {
        return Response.success<M>(this.model.fromArray(response?.data) as M);
      }

      return Response.success<M>(this.model.fromJSON(response?.data) as M);
    } catch (error) {
      return Response.error(error as Error);
    }
  }

  async fakeRequest(seconds: number, status: "success" | "error"): Promise<TResponse<{ ok: boolean }>> {
    await new Promise((resolve) => setTimeout(resolve, seconds * 1000));

    if (status === "error") {
      return Response.error(new Error("Error"));
    }

    return Response.success({ ok: true });
  }
}

export default Network;

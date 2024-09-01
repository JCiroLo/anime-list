import { Response } from ".";

import { type TResponse } from "./Response";

type TRequestURL = string | string[];
type TRequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type TRequestOptions = {
  headers?: Record<string, string>;
};

const API_URL = import.meta.env.VITE_API_URL;

const Network = {
  async request<M>(url: TRequestURL, method: TRequestMethod, options?: TRequestOptions): Promise<TResponse<M>> {
    try {
      const parsedUrl = Array.isArray(url) ? url.join("/") : url;

      const response = await (
        await fetch(API_URL + parsedUrl, {
          method,
          headers: { ...options?.headers },
        })
      ).json();

      if (Array.isArray(response?.data)) {
        return Response.success<M>(response?.data);
      }

      return Response.success<M>(response?.data);
    } catch (error) {
      return Response.error(error as Error);
    }
  },
};

export default Network;

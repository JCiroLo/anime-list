import { Response } from "./";
import { type TResponse } from "./Response";

type TRequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type TRequestOptions = { headers?: Record<string, string> };
type TRequest = <M>(
  url: string,
  method: TRequestMethod,
  options?: TRequestOptions
) => Promise<TResponse<M>>;

const API_URL = import.meta.env.VITE_API_URL;

const headers: TRequestOptions["headers"] = {
  "Content-Type": "application/vnd.api+json",
};

const Request: TRequest = async <M>(
  url: string,
  method: TRequestMethod,
  options?: TRequestOptions
): Promise<TResponse<M>> => {
  try {
    const response = await (
      await fetch(API_URL + url, {
        method,
        headers: { ...headers, ...options?.headers },
      })
    ).json();

    return Response.success<M>(response);
  } catch (error) {
    return Response.error(error as Error);
  }
};

export default Request;

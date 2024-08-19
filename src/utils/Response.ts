export type TResponseSuccess<M> = {
  ok: boolean;
  data: M;
  status?: number;
};
export type TResponseError = {
  ok: boolean;
  data: Error;
  status?: number;
};
export type TResponse<M> = TResponseSuccess<M> | TResponseError;

const Response = {
  success<M>(data: M): TResponseSuccess<M> {
    return { ok: true, data };
  },
  error(error: Error): TResponseError {
    return { ok: false, data: error };
  },
};

export default Response;

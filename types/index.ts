export type DeepObject<Leaf = unknown> = {
  [name: string | number | symbol]: DeepObject<Leaf> | Leaf;
};

export type ErrorResponse = { code: string; message: string };

export type Response<R = unknown> = { status: string | number; response: R };

export type RequestCredentials = 'include' | 'omit' | 'same-origin';

export type AuthObject = {
  token: string;
  user: { id: string; role: string; profile: { firstName: string; lastName: string } };
};

export type PollingObjectType = { delay: number; count: number; interval: NodeJS.Timer };

export type FetchApi = <R = unknown>(
  fetchUrl: string,
  config: { method: string; body?: FormData; signal?: AbortSignal; baseUrl?: string; options?: object },
) => Promise<Response<R>>;

export type Notify = (message: string) => void;

export type Option = { value: string; label: string };

export type HttpHeaderType = {
  noAuthNeeded?: boolean;
  noUseHttpOnlyCookie?: boolean;
};

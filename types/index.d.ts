/// <reference types="node" />
export declare type DeepObject<Leaf = unknown> = {
    [name: string | number | symbol]: DeepObject<Leaf> | Leaf;
};
export declare type ErrorResponse = {
    code: string;
    message: string;
};
export declare type Response<R = unknown> = {
    status: string | number;
    response: R;
};
export declare type RequestCredentials = 'include' | 'omit' | 'same-origin';
export declare type AuthObject = {
    token: string;
    user: {
        id: string;
        role: string;
        profile: {
            firstName: string;
            lastName: string;
        };
    };
};
export declare type PollingObjectType = {
    delay: number;
    count: number;
    interval: NodeJS.Timer;
};
export declare type FetchApi = <R = unknown>(fetchUrl: string, config: {
    method: string;
    body?: FormData;
    signal?: AbortSignal;
    baseUrl?: string;
    options?: object;
}) => Promise<Response<R>>;
export declare type Notify = (message: string) => void;
export declare type Option = {
    value: string;
    label: string;
};
export declare type HttpHeaderType = {
    noAuthNeeded?: boolean;
    noUseHttpOnlyCookie?: boolean;
};

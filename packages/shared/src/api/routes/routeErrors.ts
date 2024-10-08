import { APIError } from "../errors/APIError";

export type APIErrorsMap<K extends string> = { [key in K]: APIError<key> };

export type APIErrResponse<Errors extends APIErrorsMap<string>> = {
  errCode: keyof Errors;
  msg: string;
};

const DefaultAPIErrorsList = [
  new APIError({
    code: "INTERNAL_SERVER_ERROR",
    msg: "Internal server error",
    statusCode: 500,
  }),
  new APIError({
    code: "INVALID_INPUT",
    msg: "Invalid input",
    statusCode: 400,
  }),
  new APIError({
    code: "UNAUTHENTICATED",
    msg: "Unauthenticated, please log in",
    statusCode: 401,
  }),
  new APIError({
    code: "VENDOR_NOT_FOUND",
    msg: "Vendor not found",
    statusCode: 404,
  }),
  new APIError({
    code: "RATE_LIMITED",
    msg: "Rate limited",
    statusCode: 429,
  }),
  new APIError({
    code: "ACCOUNT_LOCKED",
    msg: "Account locked",
    statusCode: 403,
  }),
  new APIError({
    code: "RESOURCE_NOT_FOUND",
    msg: "Resource not found",
    statusCode: 404,
  }),
  new APIError({
    code: "UNAUTHORIZED",
    msg: "Unauthorized",
    statusCode: 403,
  }),
  new APIError({
    code: "NETWORK_ERROR",
    msg: "Network error",
    statusCode: 500,
  }),
];

export const DefaultAPIErrors = getErrorsMap(DefaultAPIErrorsList);

type DefaultAPIErrorCode = (typeof DefaultAPIErrorsList)[number]["code"];

export function getErrorsMap<
  K extends string = (typeof DefaultAPIErrorsList)[number]["code"],
>(errors: APIError<K>[]) {
  return [...errors, ...DefaultAPIErrorsList].reduce(
    (acc, error) => {
      return {
        ...acc,
        [error.code]: error,
      };
    },
    {} as APIErrorsMap<K | DefaultAPIErrorCode>
  );
}

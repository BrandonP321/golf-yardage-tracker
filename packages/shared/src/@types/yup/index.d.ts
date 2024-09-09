import { StringSchema, AnyObject } from "yup";

type RequiredReturnType = StringSchema<string, AnyObject, undefined, "">;

declare module "yup" {
  interface StringSchema {}
}

export {};

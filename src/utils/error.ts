import { CustomErrorInstance, CustomErrorOptions } from "../types";

const createCustomError = ({
  name = "Error",
  cause,
  message,
  code = 1,
  status = "500",
  layer,
}: CustomErrorOptions): CustomErrorInstance => {
  const error = new Error(message) as CustomErrorInstance;
  error.name = name;
  error.code = code;
  error.status = status;
  error.cause = cause;
  error.layer = layer;

  return Object.setPrototypeOf(error, Object.prototype);
};

export default createCustomError;

export interface RawErrorResponse {
[key:string]: any
}

export interface ApiError {
isClientError: boolean;
isTechnicalError: boolean;
message: string;
status: number;
statusText: string;
url: string;
}

export const getErrorData = (rawErrorResponse: RawErrorResponse): ApiError => {
 const { error, status, statusText, url } = rawErrorResponse;
  
const { message } = error;
  
const isClientError = status >= 400 && status <= 500;
const isTechnicalError = !isClientError;
  
return {
isClientError,
isTechnicalError,
message,
status,
statusText,
url,
};
};
import { APIError } from '../api/types';

export function apiHasError(response: any): response is APIError {
  return response && response.reason;
}

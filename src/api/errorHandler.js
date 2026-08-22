// Error handler mock - just re-throws for demo
export class ApiError extends Error {
  constructor(message, status, fieldErrors) {
    super(message);
    this.status = status;
    this.fieldErrors = fieldErrors || {};
  }
}

export function handleApiError(error) {
  return new ApiError(error?.message || 'Unbekannter Fehler', 500, {});
}

export function parseApiError(error) {
  if (error instanceof ApiError) return error.message;
  if (error?.message) return error.message;
  return 'Unbekannter Fehler';
}

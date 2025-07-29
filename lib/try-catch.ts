// Types for the result object with discriminated union
type Success<T> = {
  result: T;
  error: null;
};

type Failure<E> = {
  result: null;
  error: E;
};

type Result<T, E = Error> = Success<T> | Failure<E>;

// Main wrapper function
export async function tryCatch<T, E = Error>(promise: Promise<T>): Promise<Result<T, E>> {
  try {
    const result = await promise;
    return { result, error: null };
  } catch (error) {
    return { result: null, error: error as E };
  }
}

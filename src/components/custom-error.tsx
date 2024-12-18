import { APIResponseError } from "@/models";

export function ComponentError<T = unknown>(props: APIResponseError<T>["error"]) {
  const { message, ...errorObject } = props;
  return (
    <div>
      {message && <p className="">{message}</p>}
      {Object.entries<string[]>(errorObject as { [s: string]: string[] }).map(
        ([field, restrictions]) => (
          <div key={`error-${field}`}>
            <h3>{field}</h3>
            <ul>
              {restrictions.map((restriction) => (
                <li key={`restriction-${field}-${restriction}`}>{restriction}</li>
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
}

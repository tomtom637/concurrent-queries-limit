/**
 * A FetchConcurrently _instance_ allows limitations on the number of concurrent
 * fetches that can be made at a time. This is useful when we have a large number
 * of fetches to make and we don't want to overload the server.
 * 
 * 1. **Instantiation**:
 * 
 * We give it the number of concurrent fetches allowed, as follows:
 * 
 * ```ts
 * const fetchConcurrently = new FetchConcurrently(2);
 * ```
 * _In this example we limited concurrent queries to 2 at a time_
 * 
 * 2. **Usage**:
 * 
 * We can then use the instance to add any fetch request along with our data type:
 * 
 * 
 * ```ts
 * // Here is our conventional fetch request
 * async function getData(id: number) {
 *   try {
 *     const response = await fetch(`https://website/data/${id}`);
 *     const data = await response.json();
 *     return data;
 *   } catch (error) {
 *     // Error handling
 *   }
 * // We feed it to the add method along with with our generic data type
 * function getDataConcurrently(id: number) {
 *   return fetchConcurrently.add<DataType>(() => getData(id));
 * }
 * ```
*/
export default class FetchConcurrently {
  private fetchPromises = new Set<() => Promise<unknown>>();
  private inProgress = new Set<Promise<unknown>>();
  private concurrency: number;

  constructor(concurrency: number) {
    this.concurrency = concurrency;
  }

  /** Adds a url to be fetched concurrently and returns the promised result */
  async add<T>(fetchPromise: () => Promise<T>) {
    // Add url to urls to be fetched
    this.fetchPromises.add(fetchPromise);

    // Promise.race will return the first promise that resolves or rejects
    while (this.inProgress.size >= this.concurrency) {
      await Promise.race(this.inProgress);
    }

    // Fetch the url, then remove it from inProgress
    const promise = fetchPromise().then((result: T) => {
      this.inProgress.delete(promise);
      return result;
    });

    // Add the promise to inProgress
    this.inProgress.add(promise);

    // Return the result from the promise
    return promise;
  }
}

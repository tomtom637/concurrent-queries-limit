/**
 * A FetchConcurrently _instance_ allows limitations on the number of concurrent
 * fetches that can be made at a time. This is useful when we have a large number
 * of fetches to make and we don't want to overload the server.
 * 
 * 1. **Instantiation**:
 * 
 * We give it the number of concurrent fetches allowed and optionally our
 * data type, as follows:
 * 
 * ```ts
 * const fetchConcurrently = new FetchConcurrently<DataType[]>(2);
 * ```
 * _In this example we gave fetchConcurrently our dataType and limited concurrent_
 * _queries to 2 at a time_
 * 
 * 2. **Usage**:
 * 
 * We can then use the instance to add urls to fetch:
 * 
 * ```ts
 * function getMyDataConcurrently(id: number) {
 *   return fetchConcurrently.run(`https://myURL/myData/${id}`);
 * }
 * ```
*/
export default class FetchConcurrently<T> {
  private urls = new Set<string>();
  private inProgress = new Set<Promise<T>>();
  private concurrency: number;

  constructor(concurrency: number) {
    this.concurrency = concurrency;
  }

  /** Fetches a url and returns the data */
  private async fetchConcurrently(url: string) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  /** Adds a url to be fetched concurrently and returns the promised result */
  async run(url: string) {
    // Add url to urls to be fetched
    this.urls.add(url);

    // Promise.race will return the first promise that resolves or rejects
    while (this.inProgress.size >= this.concurrency) {
      await Promise.race(this.inProgress);
    }

    // Fetch the url, then remove it from inProgress
    const promise = this.fetchConcurrently(url).then((result: T) => {
      this.inProgress.delete(promise);
      return result;
    });

    // Add the promise to inProgress
    this.inProgress.add(promise);

    // Return the result from the promise
    return promise;
  }
}

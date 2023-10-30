import { test } from "vitest";
import assert from "assert";
import FetchConcurrently from "./FetchConcurrently";

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

async function fetchTodo(id: number) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching data");
  }
}

test("FetchConcurrently can effectively fetch", async () => {
  const fetchConcurrently = new FetchConcurrently(2);

  const promise1 = fetchConcurrently.add<Todo>(() => fetchTodo(1));
  const promise2 = fetchConcurrently.add<Todo>(() => fetchTodo(2));
  const promise3 = fetchConcurrently.add<Todo>(() => fetchTodo(3));
  const promise4 = fetchConcurrently.add<Todo>(() => fetchTodo(4));

  const result1 = await promise1;
  const result2 = await promise2;
  const result3 = await promise3;
  const result4 = await promise4;

  assert.deepStrictEqual(result1, {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
  });
  assert.deepStrictEqual(result2, {
    userId: 1,
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: false,
  });
  assert.deepStrictEqual(result3, {
    userId: 1,
    id: 3,
    title: "fugiat veniam minus",
    completed: false,
  });
  assert.deepStrictEqual(result4, {
    userId: 1,
    id: 4,
    title: "et porro tempora",
    completed: true,
  });
});

test("FetchConcurrently won't fetch more than the limit given at the same time", async () => {
  const fetchConcurrently = new FetchConcurrently(3);

  const promise1 = fetchConcurrently.add<Todo>(() => fetchTodo(1));
  const promise2 = fetchConcurrently.add<Todo>(() => fetchTodo(2));
  const promise3 = fetchConcurrently.add<Todo>(() => fetchTodo(3));
  const promise4 = fetchConcurrently.add<Todo>(() => fetchTodo(4));

    // Send all promises together
    Promise.all([promise1, promise2, promise3, promise4]);

    // Check that no more than 3 requests were executed at the same time
    assert(fetchConcurrently["inProgress"].size <= 3);
    assert((fetchConcurrently["inProgress"].size <= 2) === false);
});
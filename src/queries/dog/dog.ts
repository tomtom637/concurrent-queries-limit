import { Dog } from "./type";
import FetchConcurrently from "@/utils/FetchConcurrently";

const fetchConcurrently = new FetchConcurrently<Dog[]>(2);

export async function getDogs() {
  const response = await fetch("http://localhost:3004/dogs");
  const data: Dog[] = await response.json();
  return data;
}

export async function getDog(id: number) {
  const response = await fetch(`http://localhost:3004/dogs/${id}`);
  const data: Dog = await response.json();
  return data;
}

export function getDogsConcurrently(id: number) {
  return fetchConcurrently.run(`http://localhost:3004/dogs/${id}`);
}

import { Cat } from "./type";
import FetchConcurrently from "@/utils/FetchConcurrently";

const fetchConcurrently = new FetchConcurrently<Cat[]>(2);

export async function getCats() {
  const response = await fetch("http://localhost:3004/cats");
  const data: Cat[] = await response.json();
  return data;
}

export async function getCat(id: number) {
  const response = await fetch(`http://localhost:3004/cats/${id}`);
  const data: Cat = await response.json();
  return data;
}

export async function getCatsConcurrently(id: number) {
  return fetchConcurrently.run(`http://localhost:3004/cats/${id}`);
}

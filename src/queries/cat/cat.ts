import { Cat } from "./type";
import FetchConcurrently from "@/utils/FetchConcurrently";

const fetchConcurrently = new FetchConcurrently(2);

export async function getCats() {
  const response = await fetch("http://localhost:3004/cats");
  const data: Cat[] = await response.json();
  return data;
}

export async function getCat(id: number) {
  try {
    const response = await fetch(`http://localhost:3004/cats/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getCatsConcurrently(id: number) {
  return fetchConcurrently.add<Cat>(() => getCat(id));
}

import { Dog } from "./type";
import FetchConcurrently from "@/utils/FetchConcurrently";

const fetchConcurrently = new FetchConcurrently(2);

export async function getDogs() {
  const response = await fetch("http://localhost:3004/dogs");
  const data: Dog[] = await response.json();
  return data;
}

export async function getDog(id: number) {
  try {
    const response = await fetch(`http://localhost:3004/dogs/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export function getDogsConcurrently(id: number) {
  return fetchConcurrently.add<Dog>(() => getDog(id));
}

import { useQuery, useQueries } from "@tanstack/react-query";
import { getCats, getCat, getCatsConcurrently } from "./cat";
import { Cat } from "./type";

export default function useCat() {
  const useGetAllCats = () => {
    return useQuery<Cat[], unknown, Cat[], string[]>({
      queryKey: ["dogs"],
      queryFn: getCats,
    });
  };

  const useGetOneCat = (id: number) => {
    return useQuery<Cat, unknown, Cat, [string, number]>({
      queryKey: ["dog", id],
      queryFn: () => getCat(id),
    });
  };

  const useGetManyCats = (ids: number[]) => {
    return useQueries<Cat[]>({
      queries: ids.map(id => ({
        queryKey: ["cat", id],
        queryFn: () => getCatsConcurrently(id),
      })),
    });
  };

  return { useGetAllCats, useGetOneCat, useGetManyCats };
}

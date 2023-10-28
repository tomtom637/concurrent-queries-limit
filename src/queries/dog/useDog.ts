import { useQuery, useQueries } from "@tanstack/react-query";
import { getDogs, getDog, getDogsConcurrently } from "./dog";
import { Dog } from "./type";

export default function useDog() {
  const useGetAllDogs = () => {
    return useQuery<Dog[], unknown, Dog[], string[]>({
      queryKey: ["dogs"],
      queryFn: getDogs,
    });
  };

  const useGetOneDog = (id: number) => {
    return useQuery<Dog, unknown, Dog, [string, number]>({
      queryKey: ["dog", id],
      queryFn: () => getDog(id),
    });
  };

  const useGetManyDogs = (ids: number[]) => {
    return useQueries<Dog[]>({
      queries: ids.map(id => ({
        queryKey: ["dog", id],
        queryFn: () => getDogsConcurrently(id),
      })),
    });
  };

  return { useGetAllDogs, useGetOneDog, useGetManyDogs };
}

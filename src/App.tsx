import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useDog from "@/queries/dog/useDog";
import useCat from "@/queries/cat/useCat";
import { Dog as DogType } from "@/queries/dog/type";
import { Cat as CatType } from "@/queries/cat/type";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

function Dog() {
  const { useGetManyDogs } = useDog();
  const dogs = useGetManyDogs([1, 2, 3, 4, 6, 7, 10, 15]);

  return (
    <div
      style={{
        display: "flex",
        gap: "3rem",
        flexWrap: "wrap",
        fontSize: "0.8rem",
        minHeight: 120,
      }}
    >
      {dogs &&
        dogs.length &&
        dogs?.map(dog => {
          if (!dog || !dog.data) return null;
          const { id, name, breed, age } = dog?.data as DogType;
          return (
            <div key={`dog-${id}`}>
              <p>{name}</p>
              <p>{breed}</p>
              <p>{age}</p>
            </div>
          );
        })}
    </div>
  );
}

function Cat() {
  const { useGetManyCats } = useCat();
  const cats = useGetManyCats([1, 2, 3, 4]);

  return (
    <div
      style={{
        display: "flex",
        gap: "3rem",
        flexWrap: "wrap",
        fontSize: "0.8rem",
        minHeight: 120,
      }}
    >
      {cats &&
        cats.length &&
        cats?.map(cat => {
          if (!cat || !cat.data) return null;
          const { id, name, breed, age } = cat?.data as CatType;
          return (
            <div key={`cat-${id}`}>
              <p>{name}</p>
              <p>{breed}</p>
              <p>{age}</p>
            </div>
          );
        })}
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          alignItems: "flex-start",
        }}
      >
        <div
          style={{ padding: 20, backgroundColor: "rgba(255, 255, 255, .05)" }}
        >
          <h2 style={{ fontSize: "1rem" }}>My Dogs</h2>
          <Dog />
        </div>
        <div
          style={{ padding: 20, backgroundColor: "rgba(255, 255, 255, .05)" }}
        >
          <h2 style={{ fontSize: "1rem" }}>My Cats</h2>
          <Cat />
        </div>
      </div>
    </QueryClientProvider>
  );
}

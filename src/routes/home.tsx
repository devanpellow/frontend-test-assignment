import { useState } from "react";
import CatsDropdown from "../components/dropdown";
import Layout from "../components/layout";
import { fetchCatsByBreed, getFavouriteCats } from "../helpers/cats-api";
import { useQuery } from "@tanstack/react-query";
import CatCard from "../components/cat-card";
import { Cat, getFavouriteCatFromList } from "../helpers";

const Home = () => {
  const [selectedBreed, setSelectedBreed] = useState<{
    name: string;
    id: string;
  }>({ name: "Abyssinian", id: "abys" });

  const { data: cats, isLoading: isLoadingAllCats } = useQuery({
    queryKey: ["cats"],
    queryFn: () => fetchCatsByBreed(selectedBreed),
  });

  const { data: favouriteCats, isLoading: isLoadingFavouriteCats } = useQuery({
    queryKey: ["favourite-cats"],
    queryFn: () => getFavouriteCats("user-123"),
  });

  if (isLoadingAllCats || isLoadingFavouriteCats)
    return (
      // todo: add a skeleton loader for the cats
      <div>Is Loading... </div>
    );

  return (
    <Layout>
      <div className="w-72 z-10">
        <div className="my-3">
          <CatsDropdown
            selectedBreed={selectedBreed}
            setSelectedBreed={setSelectedBreed}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {selectedBreed &&
          cats?.map((cat: Cat) => (
            <CatCard
              key={cat.id}
              id={cat.id}
              imageUrl={cat.url}
              altText={"Cat Name"}
              isFavourite={Boolean(
                getFavouriteCatFromList(cat.id, favouriteCats)
              )}
              favouriteCatId={
                getFavouriteCatFromList(cat.id, favouriteCats)?.id
              }
            />
          ))}
      </div>
    </Layout>
  );
};

export default Home;

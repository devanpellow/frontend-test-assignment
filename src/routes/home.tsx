import { useEffect, useState } from "react";
import CatsDropdown from "../components/dropdown";
import CatsLimitSelect from "../components/select";
import Layout from "../components/layout";
import { fetchCatsByBreed, getFavouriteCats } from "../helpers/cats-api";
import { useQuery } from "@tanstack/react-query";
import CatCard from "../components/cat-card";
import { Cat, fetchLimits, getFavouriteCatFromList } from "../helpers";

const Home = () => {
  const [selectedBreed, setSelectedBreed] = useState<{
    name: string;
    id: string;
  }>({ name: "Abyssinian", id: "abys" });

  const [selectedLimit, setSelectedLimit] = useState<{
    value: string;
    label: string;
  }>(fetchLimits[0]);

  const {
    data: cats,
    isLoading: isLoadingAllCats,
    refetch,
  } = useQuery({
    queryKey: ["cats"],
    queryFn: () => fetchCatsByBreed(selectedBreed, selectedLimit),
  });

  const { data: favouriteCats, isLoading: isLoadingFavouriteCats } = useQuery({
    queryKey: ["favourite-cats"],
    queryFn: () => getFavouriteCats("user-123"),
  });

  useEffect(() => {
    refetch();
  }, [refetch, selectedBreed, selectedLimit]);

  if (isLoadingAllCats || isLoadingFavouriteCats)
    return (
      // todo: add a skeleton loader for the cats
      <div>Is Loading... </div>
    );

  return (
    <Layout>
      <div className="flex gap-4">
        <div className="w-72 z-10">
          <div className="my-3">
            <CatsDropdown
              selectedBreed={selectedBreed}
              setSelectedBreed={setSelectedBreed}
            />
          </div>
        </div>
        <div className="w-44 z-10">
          <div className="my-3">
            <CatsLimitSelect
              selectedLimit={selectedLimit}
              setSelectedLimit={setSelectedLimit}
            />
          </div>
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

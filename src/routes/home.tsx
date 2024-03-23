import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { fetchCatsByBreed, getFavouriteCats } from "../helpers/cats-api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import CatCard from "../components/cat-card";
import {
  Cat,
  fetchLimits,
  getFavouriteCatFromList,
  QueryKeys,
} from "../helpers";
import { BaseSpinner } from "../components/ui/BaseSpinner";
import Filter from "../components/filter";

const Home = () => {
  const queryClient = useQueryClient();
  const catCache = queryClient.getQueryData([QueryKeys.CATS]) as {
    data?: Cat[];
  };

  const {
    data: catsResponse,
    isLoading: isLoadingAllCats,
    refetch,
  } = useQuery({
    queryKey: [QueryKeys.CATS],
    queryFn: () => fetchCatsByBreed(selectedBreed, selectedLimit),
  });
  const { data: favouriteCats, isLoading: isLoadingFavouriteCats } = useQuery({
    queryKey: [QueryKeys.FAVOURITE_CATS],
    queryFn: () => getFavouriteCats(QueryKeys.DEFAULT_USER_ID), // This is where the user id should be passed default for now
  });

  const catList = catCache?.data || catsResponse;
  const isLoading = isLoadingAllCats || isLoadingFavouriteCats;

  const [selectedBreed, setSelectedBreed] = useState<{
    name: string;
    id: string;
  }>({ name: "Abyssinian", id: "abys" });

  const [selectedLimit, setSelectedLimit] = useState<{
    value: string;
    label: string;
  }>(fetchLimits[0]);

  useEffect(() => {
    refetch();
  }, [selectedBreed, selectedLimit]);

  return (
    <Layout>
      <Filter
        selectedBreed={selectedBreed}
        setSelectedBreed={setSelectedBreed}
        selectedLimit={selectedLimit}
        setSelectedLimit={setSelectedLimit}
      />
      {isLoading && <BaseSpinner />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {!isLoading &&
          catList &&
          catList?.map((cat: Cat) => (
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
              removeOption
            />
          ))}
      </div>
    </Layout>
  );
};

export default Home;

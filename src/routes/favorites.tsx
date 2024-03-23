import { useQuery } from "@tanstack/react-query";
import Layout from "../components/layout";
import { getFavouriteCats } from "../helpers/cats-api";

import CatCard from "../components/cat-card";
import { FavouriteCat } from "../helpers";

const Favorites = () => {
  const { data: favouriteCats, isLoading } = useQuery({
    queryKey: ["favourite-cats"],
    queryFn: () => getFavouriteCats("user-123"),
  });
  console.log(favouriteCats, "favourite cats");
  if (isLoading)
    // todo: add a skeleton loader for the cats
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  return (
    <Layout>
      {favouriteCats.length > 0 ? (
        <div className="grid grid-cols-3 gap-3">
          {favouriteCats?.map((cat: FavouriteCat) => (
            <CatCard
              key={cat.id}
              id={cat.id}
              imageUrl={cat?.image?.url}
              altText={"Cat Name"}
              isFavourite
            />
          ))}
        </div>
      ) : (
        <h1>
          You haven't picked your favourite cat pictures yet! You must not have
          seen them.{" "}
          <span>
            <a className="underline hover:cursor-pointer" href="/">
              Click here
            </a>
          </span>{" "}
          to go see some cat pictures.
        </h1>
      )}
    </Layout>
  );
};

export default Favorites;

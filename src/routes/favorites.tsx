import { useQuery } from "@tanstack/react-query";
import Layout from "../components/layout";
import { getFavouriteCats } from "../helpers/cats-api";

import CatCard from "../components/cat-card";
import { FavouriteCat, QueryKeys } from "../helpers";
import { BaseSpinner } from "../components/ui/BaseSpinner";

const Favorites = () => {
  const { data: favouriteCats, isLoading } = useQuery({
    queryKey: [QueryKeys.FAVOURITE_CATS],
    queryFn: () => getFavouriteCats(QueryKeys.DEFAULT_USER_ID),
  });

  return (
    <Layout>
      {isLoading && <BaseSpinner />}
      {!isLoading && favouriteCats.length > 0 && (
        <div className="grid grid-cols-3 gap-3 my-3">
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
      )}
      {!isLoading && favouriteCats.length === 0 && (
        <div className="my-3 text-center dark:text-gray-200" >
          <h1 className="font-bold">
            You haven't chosen your favourite cat pictures yet!
          </h1>

          <h1>
            You must not have seen them.{" "}
            <span>
              <a className="underline hover:cursor-pointer" href="/">
                Click here
              </a>
            </span>{" "}
            to go see some purr-fect cat pictures.
          </h1>
        </div>
      )}
    </Layout>
  );
};

export default Favorites;

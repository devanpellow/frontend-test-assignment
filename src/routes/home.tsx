import { useEffect, useState } from "react";
import { HiXMark, HiOutlineHeart } from "react-icons/hi2";
import CatsDropdown from "../components/dropdown";
import Layout from "../components/layout";
import { addCatToFavourites, fetchCatsByBreed } from "../helpers/cats-api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CardSkeletonLoader } from "../components/card-skeleton-loader";

const Home = () => {
  const [selectedBreed, setSelectedBreed] = useState<{
    name: string;
    id: string;
  }>({ name: "Abyssinian", id: "abys" });

  const {
    data: cats,
    isLoading,
  } = useQuery({
    queryKey: ["cats"],
    queryFn: () => fetchCatsByBreed(selectedBreed),
  });
  console.log(cats, "cats")
  const {mutateAsync: addCatToFavouritesMutation} = useMutation({
    mutationFn: (id: string) => addCatToFavourites(id),
  });

  if (isLoading)
    return (
      // todo: add a skeleton loader for the cats
      <div>is loading....</div>
    );

  const handleToggleFavourite = async (id: string) => {
    console.log("Toggle favorite cat with id: ", id);
    try {
      await addCatToFavouritesMutation(id);
      // some confirmation to the user that the cat has been added to the favorites
    } catch (error) {
      console.error("Error adding cat to favorites: ", error);
    }
  };

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
          cats?.map((cat) => (
            <div key={cat.id}>
              <div
                key={cat.id}
                className="relative border rounded-lg overflow-hidden shadow-md flex justify-center"
              >
                <img src={cat.url} className="object-cover aspect-square " />
                <div className="absolute bottom-2 w-auto p-2 bg-white/50 rounded-full ">
                  <div className="flex gap-2 ">
                    <button
                      // todo: add a confirmation modal before removing a cat from the list and
                      className="bg-gray-100 p-4 rounded-full hover:text-red-900 hover:transition"
                      onClick={() =>
                        console.log(
                          "Open confirmation modal -> remove from local state"
                        )
                      }
                    >
                      <HiXMark className="text-red-500 text-3xl" />
                    </button>
                    <button
                      className="bg-gray-100 p-4 rounded-full hover:text-rose-400 hover:transition"
                      onClick={() => handleToggleFavourite(cat.id)}
                    >
                      {/* Use this icon to show that a picture has been favorited by a user <HiHeart /> */}
                      <HiOutlineHeart className="text-3xl" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </Layout>
  );
};

export default Home;

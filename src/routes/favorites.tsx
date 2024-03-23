import { useQuery } from "@tanstack/react-query";
import Layout from "../components/layout";
import { getFavouriteCats } from "../helpers/cats-api";
import { HiXMark, HiOutlineHeart } from "react-icons/hi2";
import { addCatToFavourites, fetchCatsByBreed } from "../helpers/cats-api";

const Favorites = () => {
  const { data: favouriteCats, isLoading } = useQuery({
    queryKey: ["cats"],
    queryFn: () => getFavouriteCats("user-123"),
  });
  console.log(favouriteCats, "favourite cats");
  return (
    <Layout>
      <div>
        <h1>Favorites</h1>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {favouriteCats &&
          favouriteCats?.map((cat) => (
            <div key={cat.id}>
              <div
                key={cat.id}
                className="relative border rounded-lg overflow-hidden shadow-md flex justify-center"
              >
                <img src={cat.image.url} className="object-cover aspect-square " />
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
                      onClick={() => {}}
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

export default Favorites;

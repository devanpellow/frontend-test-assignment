import { useEffect, useState } from "react";
import { HiXMark, HiOutlineHeart } from "react-icons/hi2";
import CatsDropdown from "../components/dropdown";

const Home = () => {
  const [selectedBreed, setSelectedBreed] = useState<{
    name: string;
    id: string;
  }>({ name: "Abyssinian", id: "abys" });
  const [cats, setCats] = useState<{ url: string; id: string }[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreed?.id}&limit=10`,
        {
          headers: {
            "x-api-key": import.meta.env.VITE_CAT_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setCats(data);
    })();
  }, [selectedBreed]);

  return (
    <main className="container mx-auto">
      <div className=" w-72 z-10">
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
                      className="bg-gray-100 p-4 rounded-full"
                      onClick={() =>
                        console.log(
                          "Open confirmation modal -> remove from local state"
                        )
                      }
                    >
                      <HiXMark className="text-red-500 text-3xl" />
                    </button>
                    <button
                      className="bg-gray-100 p-4 rounded-full"
                      onClick={() => "Add/Remove from favorites"}
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
    </main>
  );
};

export default Home;

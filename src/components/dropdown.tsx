import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BaseDropdown } from "./ui/BaseDropdown";

const CatsDropdown = ({
  setSelectedBreed,
  selectedBreed,
}: {
  selectedBreed: { name: string; id: string };
  setSelectedBreed: Dispatch<SetStateAction<{ name: string; id: string }>>;
}) => {
  const [breeds, setBreeds] = useState<{ name: string; id: string }[]>([
    { name: "", id: "" },
  ]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://api.thecatapi.com/v1/breeds?limit=100&page=0",
        {
          headers: {
            "x-api-key": import.meta.env.VITE_CAT_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setBreeds(data);
    })();
  }, []);

  return (
    <BaseDropdown
      values={breeds}
      selectedValue={selectedBreed}
      setSelectedValue={setSelectedBreed}
    />
  );
};

export default CatsDropdown;

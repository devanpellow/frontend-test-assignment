import { Dispatch, SetStateAction } from "react";
import { BaseDropdown } from "./ui/BaseDropdown";
import { fetchBreeds } from "../helpers/cats-api";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../helpers";

const CatsDropdown = ({
  setSelectedBreed,
  selectedBreed,
}: {
  selectedBreed: { name: string; id: string };
  setSelectedBreed: Dispatch<SetStateAction<{ name: string; id: string }>>;
}) => {
  const { data: breedsData } = useQuery({
    queryKey: [QueryKeys.BREEDS],
    queryFn: fetchBreeds,
  });

  return (
    <BaseDropdown
      values={breedsData}
      selectedValue={selectedBreed}
      setSelectedValue={setSelectedBreed}
    />
  );
};

export default CatsDropdown;

import React, { useState } from "react";
import { HiHeart, HiOutlineHeart, HiXMark } from "react-icons/hi2";
import {
  addCatToFavourites,
  removeCatFromFavourites,
} from "../helpers/cats-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BaseModal } from "./ui/BaseModal";

interface CatCardProps {
  key: string;
  id: string;
  imageUrl: string;
  altText: string; // Ideally pass the description of the cat here
  isFavourite: boolean;
  favouriteCatId?: string;
}

const CatCard: React.FC<CatCardProps> = ({
  key,
  id,
  imageUrl,
  altText,
  isFavourite,
  favouriteCatId
}) => {
  const queryClient = useQueryClient();
  const [isClicked, setIsClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutateAsync: addCatToFavouritesMutation } = useMutation({
    mutationFn: (id: string) => addCatToFavourites(id),
  });

  const { mutateAsync: removeCatFromFavouritesMutation } = useMutation({
    mutationFn: (id: string) => removeCatFromFavourites(favouriteCatId ?? id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favourite-cats"] });
      queryClient.invalidateQueries({ queryKey: ["cats"] });
    },
  });

  const handleAddToFavourites = async (id: string) => {
    try {
      setIsClicked(true);
      await addCatToFavouritesMutation(id);
      // some confirmation to the user that the cat has been added to the favorites
    } catch (error) {
      console.error("Error adding cat to favorites: ", error);
    }
  };

  const handleRemoveFromFavourites = async (id: string) => {
    try {
      await removeCatFromFavouritesMutation(id);
      setIsClicked(false);
    } catch (error) {
      console.error("Error removing cat from favorites: ", error);
    }
  };

  return (
    <>
      <div key={key} className="card">
        <div
          key={id}
          className="relative border rounded-lg overflow-hidden shadow-md flex justify-center"
        >
          <img
            className="object-cover aspect-square"
            src={imageUrl}
            alt={altText}
          />

          <div className="absolute bottom-2 w-auto p-2 bg-white/50 rounded-full ">
            <div className="flex gap-2 ">
              <button
                className="bg-gray-100 p-4 rounded-full hover:text-red-900 hover:transition"
                onClick={() => setIsModalOpen(true)}
              >
                <HiXMark className="text-red-500 text-3xl" />
              </button>
              <button
                className="bg-gray-100 p-4 rounded-full hover:text-rose-400 hover:transition"
                onClick={() => handleAddToFavourites(id)}
              >
                {isFavourite || isClicked ? (
                  <HiHeart className="text-3xl text-rose-400"/>
                ) : (
                  <HiOutlineHeart className="text-3xl" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <BaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Are you sure you want to remove this cat from your favorites?"
        description="You can always add it back later."
        confirmAction={() => handleRemoveFromFavourites(id)}
      />
    </>
  );
};

export default CatCard;

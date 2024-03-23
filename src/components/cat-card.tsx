import React, { useState } from "react";
import { HiHeart, HiOutlineHeart, HiXMark } from "react-icons/hi2";
import {
  addCatToFavourites,
  removeCatFromFavourites,
} from "../helpers/cats-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BaseModal } from "./ui/BaseModal";
import { Cat, QueryKeys } from "../helpers";

interface CatCardProps {
  key: string;
  id: string;
  imageUrl: string;
  altText: string; // Ideally pass the description of the cat here
  isFavourite: boolean;
  favouriteCatId?: string;
  removeOption?: boolean;
}

const CatCard: React.FC<CatCardProps> = ({
  key,
  id,
  imageUrl,
  altText,
  isFavourite,
  favouriteCatId,
  removeOption,
}) => {
  const queryClient = useQueryClient();
  const [isClicked, setIsClicked] = useState(false);
  const [isFavouritesWarningModalOpen, setIsFavouritesWarningModalOpen] =
    useState(false);
  const [isRemoveWarningModalOpen, setIsRemoveWarningModalOpen] =
    useState(false);

  const { mutateAsync: addCatToFavouritesMutation } = useMutation({
    mutationFn: (id: string) => addCatToFavourites(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.FAVOURITE_CATS] });
    },
  });

  const { mutateAsync: removeCatFromFavouritesMutation } = useMutation({
    mutationFn: (id: string) => removeCatFromFavourites(favouriteCatId ?? id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.FAVOURITE_CATS] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CATS] });
    },
  });

  const addToFavourites = async (id: string) => {
    try {
      setIsClicked(true);
      await addCatToFavouritesMutation(id);
      // some confirmation to the user that the cat has been added to the favorites
    } catch (error) {
      console.error("Error adding cat to favorites: ", error);
    }
  };

  const removeFromFavourites = async (id: string) => {
    try {
      await removeCatFromFavouritesMutation(id);
      setIsClicked(false);
    } catch (error) {
      console.error("Error removing cat from favorites: ", error);
    }
  };

  const handleToggleFavourite = async (id: string) => {
    if (isFavourite) {
      setIsFavouritesWarningModalOpen(true);
    } else {
      await addToFavourites(id);
    }
  };

  const removeFromState = async (id: string) => {
    queryClient.setQueryData([QueryKeys.CATS], (data: Cat[]) =>
      data.filter((cat: Cat) => cat.id !== id)
    );

    setIsRemoveWarningModalOpen(false);
  };

  return (
    <>
      <div key={key} className="mx-4 flex justify-center md:mx-0">
        <div
          key={id}
          className="relative border rounded-lg overflow-hidden shadow-md flex justify-center w-5/6 md:w-full"
        >
          <img
            className="object-cover aspect-square"
            src={imageUrl}
            alt={altText}
          />

          <div className="absolute bottom-2 w-auto p-2 sm:bg-white/50 rounded-full ">
            <div className="flex gap-2 ">
              {removeOption && (
                <button
                  className="bg-gray-100 p-3 md:p-4 rounded-full hover:text-red-900 hover:transition"
                  onClick={() => setIsRemoveWarningModalOpen(true)}
                >
                  <HiXMark className="text-red-500 text-2xl md:text-3xl" />
                </button>
              )}
              <button
                className="bg-gray-100 p-3 md:p-4 rounded-full hover:text-rose-400 hover:transition"
                onClick={() => handleToggleFavourite(id)}
              >
                {isFavourite || isClicked ? (
                  <HiHeart className="text-xl md:text-2xl lg:text-3xl text-rose-400" />
                ) : (
                  <HiOutlineHeart className="text-xl md:text-2xl lg:text-3xl" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <BaseModal
        isOpen={isFavouritesWarningModalOpen}
        onClose={() => setIsFavouritesWarningModalOpen(false)}
        title="Are you sure you want to remove this cat from your favorites?"
        description="You can always add it back later."
        confirmAction={() => removeFromFavourites(favouriteCatId ?? id)}
      />
      <BaseModal
        isOpen={isRemoveWarningModalOpen}
        onClose={() => setIsRemoveWarningModalOpen(false)}
        title="Are you sure you want to remove this cat from the current list?"
        description="You can always add it back later."
        confirmAction={() => removeFromState(id)}
      />
    </>
  );
};

export default CatCard;

import React, { useState } from "react";
import { HiHeart, HiOutlineHeart, HiXMark } from "react-icons/hi2";
import {
  addCatToFavourites,
  removeCatFromFavourites,
} from "../helpers/cats-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Snackbar } from "@mui/joy";
import { BaseModal } from "./ui/BaseModal";
import { Cat, QueryKeys } from "../helpers";

interface CatCardProps {
  id: string;
  imageUrl: string;
  altText: string; // Ideally pass the description of the cat here
  isFavourite: boolean;
  favouriteCatId?: string;
  hasRemoveOption?: boolean;
}

const CatCard: React.FC<CatCardProps> = ({
  id,
  imageUrl,
  altText,
  isFavourite,
  favouriteCatId,
  hasRemoveOption,
}) => {
  const queryClient = useQueryClient();
  const [isClicked, setIsClicked] = useState(isFavourite); // optimistically update the UI
  const [isFavouritesWarningModalOpen, setIsFavouritesWarningModalOpen] =
    useState(false);
  const [isRemoveWarningModalOpen, setIsRemoveWarningModalOpen] =
    useState(false);

  const [isUnfavouritedToastOpen, setIsUnfavouritedToastOpen] = useState(false);

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
    },
  });

  const addToFavourites = async (id: string) => {
    try {
      setIsClicked(true);
      await addCatToFavouritesMutation(id);
    } catch (error) {
      console.error("Error adding cat to favorites: ", error);
    }
  };

  const removeFromFavourites = async (id: string) => {
    try {
      await removeCatFromFavouritesMutation(id);
      setIsClicked(false);
      setIsUnfavouritedToastOpen(true);
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

  const removeFromState = (id: string) => {
    queryClient.setQueryData([QueryKeys.CATS], (data: Cat[]) =>
      data.filter((cat: Cat) => cat.id !== id)
    );
  };

  return (
    <>
      <div key={id} className="flex justify-center" data-testid={`cat-card`}>
        <div className="relative rounded-lg overflow-hidden shadow-md flex justify-center w-3/4 md:w-full">
          <img
            className="object-cover aspect-square"
            src={imageUrl}
            alt={altText}
            role="img"
            aria-label={altText}
          />

          <div className="absolute bottom-2 w-auto p-2 bg-white/50 rounded-full">
            <div className="flex gap-2 ">
              {hasRemoveOption && (
                <button
                  data-testid={`remove-card-btn`} // Ideally this should be dynamic with index or id but since I don't have Cypress fixtures I'm using this
                  className="bg-gray-100 p-4 rounded-full hover:text-red-500 hover:transition"
                  onClick={() => setIsRemoveWarningModalOpen(true)}
                  aria-label="Remove cat"
                >
                  <HiXMark className="text-xl md:text-2xl lg:text-3xl" />
                </button>
              )}
              <button
                data-testid={`toggle-favourite-btn`} // Ideally this should be dynamic with index or id but since I don't have Cypress fixtures I'm using this
                className="bg-gray-100 p-4 rounded-full hover:text-rose-400 hover:transition"
                onClick={() => handleToggleFavourite(id)}
                aria-label={
                  isClicked ? "Remove from favorites" : "Add to favorites"
                }
              >
                {isClicked ? (
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
        description="You can always search for it again later."
        confirmAction={() => removeFromState(id)}
      />
      <Snackbar
        color="success"
        open={isUnfavouritedToastOpen}
        autoHideDuration={5000}
        onClose={() => setIsUnfavouritedToastOpen(false)}
      >
        Successfully removed cat from favourites
      </Snackbar>
    </>
  );
};

export default CatCard;

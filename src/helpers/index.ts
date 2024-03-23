export enum QueryKeys {
  BREEDS = "breeds",
  CATS = "cats",
  FAVOURITE_CATS = "favourite-cats",
}

export interface Cat {
  id: string;
  url: string;
}

export interface FavouriteCat {
  id: string;
  image: {
    id: string;
    url: string;
  };
}

export const getFavouriteCatFromList = (
  id: string,
  cats: FavouriteCat[] | undefined
) => {
  const favouriteCat = cats?.find((cat: FavouriteCat) => cat.image.id === id);
  return favouriteCat;
};

export const fetchLimits = [
  { value: "10", label: "10 responses" },
  { value: "25", label: "25 responses" },
  { value: "50", label: "50 responses" },
  { value: "100", label: "100 reponses" },
];

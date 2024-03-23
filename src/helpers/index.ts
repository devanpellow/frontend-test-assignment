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
  { value: "5", label: "5" },
  { value: "10", label: "10" },
  { value: "25", label: "25" },
  { value: "50", label: "50" },
  { value: "100", label: "100" },
];

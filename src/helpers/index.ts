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

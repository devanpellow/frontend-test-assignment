export interface SelectedBreed {
  id: string;
  name: string;
}

export interface SelectedLimit {
  value: string;
  label: string;
}

export const fetchBreeds = async () => {
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
  return data;
};

export const fetchCatsByBreed = async (
  selectedBreed: SelectedBreed,
  selectedLimit: SelectedLimit
) => {
  console.log(selectedBreed, selectedLimit, "selected breed and limit");
  const response = await fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${
      selectedBreed?.id
    }&limit=${selectedLimit?.value ?? "20"}`,
    {
      headers: {
        "x-api-key": import.meta.env.VITE_CAT_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
};

export const addCatToFavourites = async (id: string) => {
  const response = await fetch(`https://api.thecatapi.com/v1/favourites`, {
    method: "POST",
    headers: {
      "x-api-key": import.meta.env.VITE_CAT_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image_id: id, sub_id: "user-123" }),
  });
  const data = await response.json();
  console.log(data, "add cat to favs");
  return data;
};

export const getFavouriteCats = async (userId: string) => {
  const response = await fetch(
    `https://api.thecatapi.com/v1/favourites?sub_id=${userId ?? "user-123"}`,
    {
      method: "GET",
      headers: {
        "x-api-key": import.meta.env.VITE_CAT_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
};

export const removeCatFromFavourites = async (id: string) => {
  const response = await fetch(
    `https://api.thecatapi.com/v1/favourites/${id}`,
    {
      method: "DELETE",
      headers: {
        "x-api-key": import.meta.env.VITE_CAT_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  console.log(data, "remove cat from favs");
  return data;
};

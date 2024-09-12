import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";

const API_KEY = "Client-ID QGPN2fVjQ-k0DNYrM7pyjEuxgmI9R74BeIdz0ljU_Fk";

axios.defaults.headers.common["Authorization"] = `Bearer ${API_KEY}`;

axios.defaults.params = {
  orientation: "landscape",
  per_page: 15,
};

export const getPhotos = async (query, page) => {
  const { data } = await axios.get(`/search/photos`, {
    params: {
      query: query,
      page: page,
    },
  });

  return data;
};

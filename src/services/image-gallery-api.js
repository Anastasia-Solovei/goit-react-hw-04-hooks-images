// import axios from "axios";

// const API_KEY = "22025483-02f71c6158d17e06d5b927dc1";
// const BASE_URL = "https://pixabay.com/api/";

// function fetchImages(query, page) {
//   axios.defaults.baseURL = `${BASE_URL}?q=${query}&page=${page}`;
//   axios.defaults.params = {
//     key: API_KEY,
//     image_type: "photo",
//     orientation: "horizontal",
//     per_page: 12,
//   };

//   return axios.get().then((response) => {
//     if (response.status === 200 && response.data.hits.length > 0) {
//       return response.data;
//     }

//     return Promise.reject(new Error("Oops nothing was found :("));
//   });
// }

// const imageGalleryApi = {
//   fetchImages,
// };

// export default imageGalleryApi;

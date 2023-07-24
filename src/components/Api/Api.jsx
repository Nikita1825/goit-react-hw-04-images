import axios from 'axios';

export const PixFetch = async (value, page) => {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${value}&page=${page}&key=36587464-4c7af3360402d576ec8eb9edd&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};

import axios from 'axios'

axios.defaults.baseURL = 'https://pixabay.com/api/'

// export const fetchImages = async (query, page) => {
//     const {data} = await axios.get('', {
//         params: {
//           key: '42110209-7b075b8eaa13f3df464bddae0',
//           orientation: 'horizontal',
//           color: `${query}`,
//           per_page: 12,
//           image_type: 'photo',
//           page: `${page}`,
//           q: `${query}`,
//         },
//       });
//     console.log(data)
//     return data
// };


export const fetchImages = async configParams => {
    const { data } = await axios.get('', {
      params: {
        key: '42078504-06c0bc861c70afe486d8727f6',
        per_page: 12,
        orientation: 'horizontal',
        ...configParams,
      },
    });
    console.log(data);
    return data;
  };

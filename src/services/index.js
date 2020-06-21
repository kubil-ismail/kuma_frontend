import axios from 'axios';

const url = 'http://localhost:8000/';

// Fetch Data
export const get = async (data) => {
  try {
    const getData = await axios.get(url + data.url, data.body, data.config);
    return getData;
  } catch (error) {
    return error;
  }
};

// Post Data
export const post = async (data) => {
  try {
    const postData = await axios.post(url + data.url, data.body, data.config);
    return postData;
  } catch (error) {
    return error;
  }
};

// Patch Data
export const patch = async (data) => {
  try {
    const patchData = await axios.patch(url + data.url, data.body, data.config);
    return patchData;
  } catch (error) {
    return error;
  }
};

// Delete Data
export const remove = async (data) => {
  try {
    const removeData = await axios.delete(url + data.url, data.body, data.config);
    return removeData;
  } catch (error) {
    return error;
  }
};

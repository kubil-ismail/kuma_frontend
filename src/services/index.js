import axios from 'axios';

const url = 'https://kuma-server.herokuapp.com/';

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

// Post Book
export const addBook = async (data, apikey) => {
  try {
    const {
      bookName,
      bookDesc,
      file,
      bookPublished,
      bookLanguage,
      bookGenre,
      bookAuthor,
      bookStatus,
    } = data;

    // eslint-disable-next-line no-undef
    const formData = new FormData();
    formData.append('name', bookName);
    formData.append('description', bookDesc);
    formData.append('picture', file);
    formData.append('genreId', parseInt(bookGenre.value, 10));
    formData.append('authorId', parseInt(bookAuthor.value, 10));
    formData.append('statusId', parseInt(bookStatus.value, 10));
    formData.append('published', bookPublished);
    formData.append('language', bookLanguage);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: apikey,
      },
    };

    const postData = await axios.post(`${url}book`, formData, config);
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

// Edit Cover
export const cover = async (id, data) => {
  try {
    // eslint-disable-next-line no-undef
    const form = new FormData();
    const imagedata = data.image;
    form.append('picture', imagedata);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: data.apikey,
      },
    };

    const patchData = await axios.patch(`${url}book/cover/${id}`, form, config);
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

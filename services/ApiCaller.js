import customAxios from '../api';

export const getDataApi = ({ path = 'no-path-provided', data = {} }) => {
  try {
    return new Promise((resolve, reject) => {
      return customAxios
        .get(path, { data })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  } catch (error) {
    return error;
  }
};
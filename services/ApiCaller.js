import customAxios from "../api";

export const getDataApi = ({ path = "no-path-provided", data = {} }) => {
  try {
    return new Promise((resolve, reject) => {
      return customAxios
        .get(path, { data })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  } catch (error) {
    return error;
  }
};

export const getDownloadData = ({ path = "no-path-provided", data = {} }) => {
  try {
    return new Promise((resolve, reject) => {
      return customAxios
        .get(path, { responseType: "blob" })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  } catch (error) {
    return error;
  }
};

export const postDataApi = ({ path = "no-path-provided", data = {} }) => {
  try {
    return new Promise((resolve, reject) => {
      customAxios
        .post(path, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject({ message: error.response?.data?.error || error.message });
        });
    });
  } catch (error) {
    return error;
  }
};

export const putDataApi = ({ path = "no-path-provided", data = {} }) => {
  try {
    return new Promise((resolve, reject) => {
      customAxios
        .put(path, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  } catch (error) {
    return error;
  }
};

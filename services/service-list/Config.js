export const Config = (details) => {
  return {
    serviceList: {
      path: `center/${details.centerId}/service-list/${details.category}`,
    },
  };
};

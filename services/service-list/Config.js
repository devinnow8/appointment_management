export const Config = (details) => {
  console.log("detailsdetails=>122", details);
  return {
    serviceList: {
      path: `center/${details.centerId}/service-list/${details.category}`,
    },
  };
};

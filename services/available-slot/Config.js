export const Config = (details) => {
  return {
    getAvailableSlotList: {
      path: `center/${details.id}/available-slots?date=${details.date}&day=${details.day}`,
    },
  };
};

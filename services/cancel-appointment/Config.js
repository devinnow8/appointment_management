export const Config = (details) => {
  return {
    cancelAppointment: {
      path: `center/${details.centerId}/appointment/${details.appointmentId}/Cancel`,
    },
  };
};

export const Config = (details) => {
  return {
    rescheduldeAppointment: {
      path: `center/${details.centerId}/appointment/${details.appointmentId}/reschedule`,
    },
  };
};

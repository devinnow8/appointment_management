export const Config = (details) => {
  return {
    rescheduldeAppointment: {
      path: `/appointment/${details.appointmentId}/Reschedule`,
    },
  };
};

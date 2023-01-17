import { GET_USER_APPOINTMENT, GET_MEMBERS, GET_VISA_MEMBERS } from "../types";

export const getUserAppointment = (user) => ({
  type: GET_USER_APPOINTMENT,
  payload: user,
});

export const setMembers = (membersData) => ({
  type: GET_MEMBERS,
  payload: membersData,
});

export const setVisaMembers = (membersData) => ({
  type: GET_VISA_MEMBERS,
  payload: membersData,
});

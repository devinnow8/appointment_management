import {
  GET_USER_APPOINTMENT,
  GET_MEMBERS,
  GET_VISA_MEMBERS,
} from "../../types/index";

const initialState = {
  userAppointmentDetails: {},
  members: [],
  visaMembers: [],
};

const userReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case GET_USER_APPOINTMENT:
      return { ...prevState, userAppointmentDetails: action.payload };
    case GET_MEMBERS:
      return { ...prevState, members: action.payload };
    case GET_VISA_MEMBERS:
      return { ...prevState, visaMembers: action.payload };
    default:
      return prevState;
  }
};

export default userReducer;

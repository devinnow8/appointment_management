import React from "react";
import { Button, Col, Row } from "reactstrap";
import { useRouter } from "next/router";
import Calendar from "./calendar";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { rescheduleAppointmentFetchRequest } from "../../../redux/reducer/reschedule-appointment";
import Loader from "../../loader";

const CalendarTime = ({
  arrayTime,
  slideToShow,
  setSlideToShow,
  isLoader,
  applicantAppointment,
  setApplicantAppointment,
  selectedCenter,
  setSelectedCenter,
  selectedDate,
  setSelectedDate,
  setModal,
  setConfirmCalendar,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { applicationDetails } = useSelector(
    (state) => state.applicationDetails,
  );
  const { isLoading } = useSelector((state) => state.rescheduleAppointment);

  const handleRescheduleAppointment = () => {
    const details = {
      date: moment(applicantAppointment.date).format("YYYY-MM-DD"),
      time: applicantAppointment?.time,
      centerId: selectedCenter?.centerId,
      appointmentId: applicationDetails.appointmentId,
    };
    dispatch(rescheduleAppointmentFetchRequest(details), (success) => {
      router.push("/appointment-booked");
    });
  };
  return (
    <div className="appointment-calender">
      <Row>
        <Col md={12} lg={12} xl={12}>
          <Calendar
            setApplicantAppointment={setApplicantAppointment}
            selectedCenter={selectedCenter}
            setSelectedCenter={setSelectedCenter}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            arrayTime={arrayTime}
            slideToShow={slideToShow}
            setSlideToShow={setSlideToShow}
            isLoader={isLoader}
          />
          <h2 className="d-block d-md-none sel-time">Select Time</h2>
        </Col>
        {applicationDetails.appointmentId ? (
          <>
            <Col sm={12} md={12} className="text-end">
              <div className="appointment-calender__buttons">
                <Button
                  className="cancel-btn me-3"
                  // onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button
                  className="continue"
                  onClick={handleRescheduleAppointment}
                  disabled={!applicantAppointment?.time?.length}
                >
                  Continue
                  <Loader isLoader={isLoading} />
                </Button>
              </div>
            </Col>
          </>
        ) : (
          <Col sm={12} md={12} className="text-end">
            <div className="appointment-calender__buttons">
              <Button className="cancel-btn me-3" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button
                className="continue"
                onClick={() => {
                  setModal(true);
                  setConfirmCalendar(true);
                }}
                disabled={!applicantAppointment?.time?.length}
              >
                Continue
              </Button>
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default CalendarTime;

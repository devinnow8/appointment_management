import { Button, Col, Container, Row } from "reactstrap";
import Header from "../components/Header";
import { useRouter } from "next/router";

function RescheduleAppointment() {
  const { push } = useRouter();
 
  return (
    <>
      <Header />
    RescheduleAppointment
    </>
  );
}

export default RescheduleAppointment;

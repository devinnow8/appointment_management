import { Button, Col, Container, Row } from "reactstrap";
import Header from "../components/header";
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

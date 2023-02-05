import { Button, Col, Container, Row } from "reactstrap";
import Header from "../components/Header";
import { useRouter } from "next/router";

function CancelAppointment() {
  const { push } = useRouter();
 
  return (
    <>
      <Header />
    CancelAppointment
    </>
  );
}

export default CancelAppointment;

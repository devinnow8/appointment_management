import Image from "next/image";
import { Container, Row, Col } from "reactstrap";
import Visa from "./Visa";
import Others from "./Others";

const index = ({ handleAddMember, selectedService }) => {
  return (
    <header className="inner-header">
      <Container>
        <Row className="inner-header__row">
          <Col md={1} lg={1} xl={1}>
            <Image
              className="inner-header__logo"
              width={60}
              height={56}
              src="/images/logo.png"
              alt=""
            />
          </Col>
          <Col md={11} lg={11} xl={11}>
            <div className="inner-header__member">
              {selectedService === "Visa" ? (
                <Visa handleAddMember={handleAddMember}/>
              ) : (
                <Others handleAddMember={handleAddMember}/>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default index;

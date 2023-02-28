import Image from "next/image";
import { Container, Row, Col } from "reactstrap";
import Visa from "./Visa";
import Others from "./Others";
import { useSelector } from "react-redux";

const index = ({ handleAddMember, isLoader, isAddMember, setIsAddMember }) => {
  const { applicationDetails } = useSelector(
    (state) => state.applicationDetails,
  );
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
              {applicationDetails.category.toLowerCase().includes("visa") ? (
                <Visa handleAddMember={handleAddMember} />
              ) : (
                <Others
                  handleAddMember={handleAddMember}
                  isLoader={isLoader}
                  isAddMember={isAddMember}
                  setIsAddMember={setIsAddMember}
                />
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default index;

import Image from "next/image";
import React from "react";
import {
  Button,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Header from "../components/Header";

const MakePayment = () => {
  return (
    <>
      <Header />
      <section className="make-payment">
        <Container>
          <Row>
            <Col md={5} lg={4} xl={4}>
              <h3 className="make-payment__title">Make Payment</h3>
              <div className="make-payment__details">
                <h4 className="make-payment__details--title">
                  Payment Details
                </h4>
                <div className="make-payment__details--flex">
                  <div className="make-payment__details--heading">
                    <h4>Appointment ID</h4>
                  </div>
                  <div className="make-payment__details--value">
                    <p>EPK4746534</p>
                  </div>
                </div>
                <div className="make-payment__details--flex">
                  <div className="make-payment__details--heading">
                    <h4>Appointment Date</h4>
                  </div>
                  <div className="make-payment__details--value">
                    <p>11/12/2022</p>
                  </div>
                </div>
                <div className="make-payment__details--flex">
                  <div className="make-payment__details--heading">
                    <h4>Application Fee</h4>
                  </div>
                  <div className="make-payment__details--value">
                    <p>&#163;20</p>
                  </div>
                </div>
                <div className="make-payment__details--flex total-fee">
                  <div className="make-payment__details--heading">
                    <h4>Application Fee</h4>
                  </div>
                  <div className="make-payment__details--value">
                    <p>&#163;20</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={7} lg={8} xl={8}>
              <div className="choose-gateway">
                <h3 className="make-payment__title">Choose Gateway</h3>
                <div className="choose-gateway__option">
                  <div className="choose-gateway__option--box">
                    <FormGroup check>
                      <Input name="radio1" type="radio" checked />{" "}
                    </FormGroup>
                    <Image
                      src="/images/stripe.png"
                      alt=""
                      width={36}
                      height={36}
                    />
                    <p className="choose-gateway__title">Stripe</p>
                  </div>
                  <div className="choose-gateway__option--box">
                    <FormGroup check>
                      <Input name="radio1" type="radio" />{" "}
                    </FormGroup>
                    <Image
                      src="/images/pay-pal.png"
                      alt=""
                      width={36}
                      height={36}
                    />
                    <p className="choose-gateway__title">Paypal</p>
                  </div>
                  <div className="choose-gateway__option--box">
                    <FormGroup check>
                      <Input name="radio1" type="radio" />{" "}
                    </FormGroup>
                    <Image
                      src="/images/amazon-pay.png"
                      alt=""
                      width={36}
                      height={36}
                    />
                    <p className="choose-gateway__title">Amazon Pay</p>
                  </div>
                </div>
                <div className="choose-gateway__card">
                  <h3 className="choose-gateway__card--title">
                    Fill your card details
                  </h3>
                  <Row>
                    <Col md={6} lg={6}>
                      <FormGroup>
                        <Label for="name">
                          Card Number <span className="star">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="**** **** 5467"
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6} lg={6}>
                      <FormGroup>
                        <Label for="name">
                          Cardholder Name <span className="star">*</span>
                        </Label>
                        <Input id="name" name="name" type="text" />
                      </FormGroup>
                    </Col>
                    <Col md={6} lg={6}>
                      <FormGroup>
                        <Label for="name">
                          Expiry Date<span className="star">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="09/25"
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6} lg={6}>
                      <FormGroup>
                        <Label for="name">
                          CVV<span className="star">*</span>
                        </Label>
                        <Input id="name" name="name" type="text" />
                      </FormGroup>
                    </Col>
                    <Col md={12} lg={12} className="text-center">
                      <Button className="pay-btn">Pay Now</Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default MakePayment;

import React from "react";
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap";
import Image from "next/image";
import { paymentModeType } from "../../constants/index";
import { useSelector } from "react-redux";
import Loader from "../loader";
import { useRouter } from "next/router";

const PaymentMode = ({ paymentType, handleType, handlePayNow }) => {
  const { isLoading } = useSelector((state) => state.appointmentSchedule);
  const router = useRouter();

  return (
    <Col md={7} lg={8} xl={8}>
      <div className="choose-gateway">
        <h3 className="make-payment__title">Choose Gateway</h3>
        <div className="choose-gateway__option" onChange={(e) => handleType(e)}>
          <div
            className={`choose-gateway__option--box ${
              paymentType.paymentMode === paymentModeType.stripe
                ? "radio-active"
                : ""
            }`}
          >
            <div>
              <input
                type="radio"
                value={paymentModeType.stripe}
                name="type"
                checked={paymentType.paymentMode === paymentModeType.stripe}
              />{" "}
            </div>
            <Image src="/images/razorpay.png" alt="" width={36} height={36} />
            <p className="choose-gateway__title">Stripe</p>
          </div>
          {/* <div
            className={`choose-gateway__option--box ${
              paymentType.paymentMode === paymentModeType.payPal
                ? "radio-active"
                : ""
            }`}
          >
            <div>
              <input
                type="radio"
                value={paymentModeType.payPal}
                name="type"
                checked={paymentType.paymentMode === paymentModeType.payPal}
              />{" "}
            </div>
            <Image src="/images/pay-pal.png" alt="" width={36} height={36} />
            <p className="choose-gateway__title">PayPal</p>
          </div>
          <div
            className={`choose-gateway__option--box ${
              paymentType.paymentMode === paymentModeType.amazonPay
                ? "radio-active"
                : ""
            }`}
          >
            <div>
              <input
                type="radio"
                value={paymentModeType.amazonPay}
                name="type"
                checked={paymentType.paymentMode === paymentModeType.amazonPay}
              />{" "}
            </div>
            <Image src="/images/amazon-pay.png" alt="" width={36} height={36} />
            <p className="choose-gateway__title">Amazon Pay</p>
          </div> */}
        </div>
        <div className="payment-mode-info">
          <div className="payment-info">
            <div className="payment-image">
              <p className="txt">Credit Card/Debit Card/Net Banking</p>
              <div className="img-flex">
                <Image src="/images/razor2.png" alt="" width={36} height={36} />
                <div>
                  <h5 className="mb-0">Pay by Razorpay</h5>
                  <p className="mb-0">Cards, Netbanking, Wallet & UPI</p>
                </div>
              </div>
            </div>
            <div className="info-card">
              <p className="text mb-0">
                Pay securely by Credit or Debit card of Internet Banking through
                Razorpay.
              </p>
            </div>
          </div>
        </div>

        <div className="choose-gateway__card">
          {/* <h3 className="choose-gateway__card--title">
            Fill your card details
          </h3>
          <Row>
            <Col md={6} lg={6}>
              <FormGroup>
                <Label for="name">
                  Card Number<span className="star">*</span>
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
                  Cardholder Name<span className="star">*</span>
                </Label>
                <Input id="name" name="name" type="text" />
              </FormGroup>
            </Col>
            <Col md={6} lg={6}>
              <FormGroup>
                <Label for="name">
                  Expiry Date<span className="star">*</span>
                </Label>
                <Input id="name" name="name" type="text" placeholder="09/25" />
              </FormGroup>
            </Col>
            <Col md={6} lg={6}>
              <FormGroup>
                <Label for="name">
                  CVV<span className="star">*</span>
                </Label>
                <Input id="name" name="name" type="password" />
              </FormGroup>
            </Col>
          </Row> */}
          <Row>
            <Col md={12} lg={12} className="text-center">
              <Button className="cancel" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button className="pay-btn" onClick={handlePayNow}>
                Pay Now
                <Loader isLoader={isLoading} />
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </Col>
  );
};

export default PaymentMode;

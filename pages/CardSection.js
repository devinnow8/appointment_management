import React, { useMemo } from "react";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";

const useOptions = () => {
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize: "20px",
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }),
    [],
  );

  return options;
};

function CardSection({ setName }) {
  const options = useOptions();
  return (
    <>
      <Row>
        <Col lg={6} xl={6}>
          <div>
            <label htmlFor="Card number">Card number</label>
            <CardNumberElement
              className="testt"
              options={options}
              onReady={() => {
                console.log("CardNumberElement [ready]");
              }}
              onChange={(event) => {
                console.log("CardNumberElement [change]", event);
              }}
              onBlur={() => {
                console.log("CardNumberElement [blur]");
              }}
              onFocus={() => {
                console.log("CardNumberElement [focus]");
              }}
            />
          </div>
        </Col>
        <Col lg={6} xl={6}>
          <FormGroup>
            <Label for="name">Cardholder Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col lg={6} xl={6}>
          <div>
            <label htmlFor="exp">Expiration date</label>
            <CardExpiryElement
              options={options}
              onReady={() => {
                console.log("CardNumberElement [ready]");
              }}
              onChange={(event) => {
                console.log("CardNumberElement [change]", event);
              }}
              onBlur={() => {
                console.log("CardNumberElement [blur]");
              }}
              onFocus={() => {
                console.log("CardNumberElement [focus]");
              }}
            />
          </div>
        </Col>
        <Col lg={6} xl={6}>
          <div>
            <label htmlFor="cvv">CVC</label>
            <CardCvcElement
              options={options}
              onReady={() => {
                console.log("CardNumberElement [ready]");
              }}
              onChange={(event) => {
                console.log("CardNumberElement [change]", event);
              }}
              onBlur={() => {
                console.log("CardNumberElement [blur]");
              }}
              onFocus={() => {
                console.log("CardNumberElement [focus]");
              }}
            />
          </div>
        </Col>
      </Row>
    </>
  );
}

export default CardSection;

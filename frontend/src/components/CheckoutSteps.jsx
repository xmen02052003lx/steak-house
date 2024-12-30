import React from "react"
import { Nav } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const stepStyle = {
    active: { color: "#28a745", fontWeight: "bold" },
    inactive: { color: "#6c757d", fontWeight: "normal" },
    completedIcon: { marginRight: "5px", color: "#28a745" },
    inactiveIcon: { marginRight: "5px", color: "#6c757d" }
  }

  return (
    <Nav className="justify-content-center mb-4" style={{ fontSize: "1.2rem" }}>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link style={stepStyle.active}>
              <FaCheckCircle style={stepStyle.completedIcon} /> Sign In
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled style={stepStyle.inactive}>
            <FaTimesCircle style={stepStyle.inactiveIcon} /> Sign In
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link style={stepStyle.active}>
              <FaCheckCircle style={stepStyle.completedIcon} /> Shipping
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled style={stepStyle.inactive}>
            <FaTimesCircle style={stepStyle.inactiveIcon} /> Shipping
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link style={stepStyle.active}>
              <FaCheckCircle style={stepStyle.completedIcon} /> Payment
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled style={stepStyle.inactive}>
            <FaTimesCircle style={stepStyle.inactiveIcon} /> Payment
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link style={stepStyle.active}>
              <FaCheckCircle style={stepStyle.completedIcon} /> Place Order
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled style={stepStyle.inactive}>
            <FaTimesCircle style={stepStyle.inactiveIcon} /> Place Order
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps

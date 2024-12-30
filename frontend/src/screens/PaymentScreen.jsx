import { useState, useEffect } from "react"
import { Form, Button, Col } from "react-bootstrap"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import FormContainer from "../components/FormContainer"
import CheckoutSteps from "../components/CheckoutSteps"
import { savePaymentMethod } from "../slices/cartSlice"

const PaymentScreen = () => {
  const navigate = useNavigate()
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping")
    }
  }, [navigate, shippingAddress])

  const [paymentMethod, setPaymentMethod] = useState("PayPal")

  const dispatch = useDispatch()

  const submitHandler = e => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate("/placeorder")
  }

  return (
    <div className="mt-5 pt-3 mb-5">
      <Link to="/shipping" className="btn btn-light my-3">
        Go Back
      </Link>
      <CheckoutSteps step1 step2 step3 />
      <FormContainer>
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as="legend">Select Method</Form.Label>
            <Col>
              <Form.Check
                className="my-2"
                type="radio"
                label="Tiền mặt khi nhận hàng"
                id="Tiền mặt"
                name="paymentMethod"
                value="Tiền mặt"
                checked
                onChange={e => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <Form.Check
                className="my-2"
                type="radio"
                label="PayPal hoặc thẻ tín dụng"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked
                onChange={e => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>

          <Button type="submit" variant="primary">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </div>
  )
}

export default PaymentScreen

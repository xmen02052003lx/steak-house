import { useEffect, useState } from "react"
import { Button, Row, Col, Image } from "react-bootstrap"
import { FaPlus, FaMinus } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, removeFromCart } from "../slices/cartSlice"
import { Link } from "react-router-dom"

const MenuItem = ({ product, justShow }) => {
  console.log("product.image.contentType:", product)
  const imageUrl = `data:${product.image.contentType};base64,${product.image.data}`

  const cart = useSelector(state => state.cart)
  console.log("cart")
  console.log(cart)
  const dispatch = useDispatch()

  let [qty, setQty] = useState(0)

  useEffect(() => {
    const item = cart.cartItems.find(item => item._id === product._id)
    if (item) {
      console.log("item")
      console.log(item)
      console.log("item name")
      console.log(item.name)
      console.log("item qty")
      console.log(item.qty)
      setQty(prevQty => (prevQty = item.qty))
    } else {
      setQty(prevQty => (prevQty = 0))
    }
    console.log("qty")
    console.log(qty)
  }, [])

  const addToCartHandler = () => {
    const newQty = qty + 1
    setQty(newQty)
    console.log("qty in onClick", newQty)
    dispatch(addToCart({ ...product, qty: newQty }))
  }

  // Handler to remove one item from the cart or remove it entirely if quantity reaches 0
  const removeFromCartHandler = () => {
    const newQty = qty - 1
    if (newQty <= 0) {
      setQty(newQty)
      dispatch(removeFromCart(product._id)) // Remove item if quantity is 0
    } else {
      setQty(newQty)
      dispatch(addToCart({ ...product, qty: newQty })) // Update cart with decreased quantity
    }
  }

  const formatPrice = price => {
    // Format the price with Vietnamese locale
    return new Intl.NumberFormat("vi-VN").format(price) + " đ"
  }
  return (
    <Row className="mb-3">
      <Col md={4}>
        <Image
          src={imageUrl}
          className="object-fit-cover"
          fluid
          style={{ height: "100%" }}
        />
      </Col>
      <Col md={4}>
        <Link to={`/product/${product._id}`}>
          <p className="fw-bold">{product.name}</p>
        </Link>
      </Col>
      <Col md={4}>
        <p style={{ color: "orange", fontWeight: "bold" }}>
          {formatPrice(product.price)}
        </p>
        {!justShow && (
          <>
            <Button
              variant="primary"
              className="btn-sm"
              onClick={removeFromCartHandler}
              disabled={qty === 0} // Disable minus button if qty is 0
            >
              <FaMinus />
            </Button>
            <span className="p-2">{qty}</span>

            <Button
              variant="primary"
              className="btn-sm"
              onClick={addToCartHandler}
            >
              <FaPlus />
            </Button>
          </>
        )}
      </Col>
    </Row>
  )
}
export default MenuItem

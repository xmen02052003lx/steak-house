import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
// import { usePickupDishMutation } from "../slices/restaurantApiSlice"
// import { clearCartItems } from "../slices/cartSilce"

const PlaceOrder = ({ checkinUrl }) => {
  // const [pickupDish, { isLoading: loadingPickup }] = usePickupDishMutation()
  const { id: tableId } = useParams()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)

  let items = []

  const placeOrderHandler = async () => {
    try {
      cart.cartItems.map(item => {
        items.push({
          item_id: item._id,
          quantity: item.qty,
          name: item.name,
          price: item.price
        })
      })
      console.log("checkinUrl:", checkinUrl)
      console.log("items:", items)
      // await pickupDish({
      //   items,
      //   checkinUrl
      // }).unwrap()
      // dispatch(clearCartItems())
      toast.success("Order successfully")
      navigate(`/manager/tablelist`)
    } catch (err) {
      console.error(err)
      toast.error(err)
    }
  }

  const formatPrice = price => {
    // Format the price with Vietnamese locale
    return new Intl.NumberFormat("vi-VN").format(price) + " đ"
  }
  const checkoutHandler = () => {
    navigate(`/eatin/placeorder/${tableId}`)
  }

  return (
    <>
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>CÁC MÓN ĐÃ CHỌN</h2>
            {cart.cartItems.length === 0 ? (
              <Message>Giỏ hàng của bạn đang trống</Message>
            ) : (
              <ListGroup
                variant="flush"
                style={{ maxHeight: "16em", overflowY: "auto" }}
              >
                {cart.cartItems.map((item, index) => {
                  const imageUrl = `data:${item.image.contentType};base64,${item.image.data}`

                  return (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={3}>
                          <Image src={imageUrl} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {formatPrice(item.price)} =
                          {formatPrice(item.qty * item.price)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )
                })}
              </ListGroup>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>Tổng hóa đơn</Col>
              <Col className="text-center">{formatPrice(cart.itemsPrice)}</Col>
            </Row>
            <Row>
              <Col>VAT</Col>
              <Col className="text-center">{formatPrice(cart.taxPrice)}</Col>
            </Row>
            <Row className="text-center">
              <p>SỐ TIỀN CẦN THANH TOÁN:</p>
              <p>
                {formatPrice(Number(cart.itemsPrice) + Number(cart.taxPrice))}
              </p>
            </Row>
            <Row>
              <Button
                onClick={checkoutHandler}
                disabled={cart.cartItems.length == 0}
              >
                Đặt Món
              </Button>
            </Row>
          </ListGroup.Item>
        </ListGroup>
        {/* {loadingPickup && <Loader />} */}
      </Card>
    </>
  )
}
export default PlaceOrder

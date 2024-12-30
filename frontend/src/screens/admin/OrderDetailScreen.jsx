import { useParams } from "react-router-dom"
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  Container
} from "react-bootstrap"

import { useSelector } from "react-redux"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
// import {
//   useGetBillQuery,
//   useSaveBillMutation
// } from "../../slices/billsApiSlice"

const OrderScreen = () => {
  const { id: orderId } = useParams()

  // const {
  //   data: order,
  //   refetch, // as the name suggested, this is used to re-fetch the new data
  //   isLoading,
  //   error
  // } = useGetBillQuery(orderId)

  //   const qrCode = `data:${item.item_id.image.contentType};base64,${item.item_id.image.data}`

  // const [saveBill, { isLoading: loadingPay }] = useSaveBillMutation()

  const { userInfo } = useSelector(state => state.auth)

  const payHandler = async () => {
    // await saveBill(orderId)
    // refetch()
  }

  // return isLoading ? (
  //   <Container>
  //     <div className="mt-5 pt-5 mb-5 pb-5">
  //       <Loader />
  //     </div>
  //   </Container>
  // ) : error ? (
  //   <Container>
  //     <div className="mt-5 pt-5 mb-5 pb-5">
  //       <Message variant="danger">{error.data.message}</Message>{" "}
  //     </div>
  //   </Container>
  // ) : (
  //   <>
  //     <Container>
  //       <div className="mt-5 pt-5 mb-5 pb-5">
  //         <h1>Order {order._id}</h1>
  //         <Row>
  //           <Col md={8}>
  //             <ListGroup variant="flush">
  //               <ListGroup.Item>
  //                 {order.paid ? (
  //                   <Message variant="success">Paid on {order.paidAt}</Message>
  //                 ) : (
  //                   <div>
  //                     <Message variant="danger">Not Paid</Message>
  //                     <Image
  //                       src={order.table_id.qrCode}
  //                       alt="Mã QR"
  //                       fluid
  //                       rounded
  //                     />
  //                   </div>
  //                 )}
  //               </ListGroup.Item>

  //               <ListGroup.Item>
  //                 <h2>Order Items</h2>
  //                 {order.items.length === 0 ? (
  //                   <Message>Order is empty</Message>
  //                 ) : (
  //                   <ListGroup variant="flush">
  //                     {order.items.map((item, index) => {
  //                       const imageUrl = `data:${item.item_id.image.contentType};base64,${item.item_id.image.data}`

  //                       return (
  //                         <ListGroup.Item key={index}>
  //                           <Row>
  //                             <Col md={1}>
  //                               <Image
  //                                 src={imageUrl}
  //                                 alt={item.name}
  //                                 fluid
  //                                 rounded
  //                               />
  //                             </Col>
  //                             <Col>
  //                               <p>{item.name}</p>
  //                             </Col>
  //                             <Col md={4}>
  //                               {item.quantity} x ${item.price} = $
  //                               {item.quantity * item.price}
  //                             </Col>
  //                           </Row>
  //                         </ListGroup.Item>
  //                       )
  //                     })}
  //                   </ListGroup>
  //                 )}
  //               </ListGroup.Item>
  //             </ListGroup>
  //           </Col>
  //           <Col md={4}>
  //             <Card>
  //               <ListGroup variant="flush">
  //                 <ListGroup.Item>
  //                   <h2>Order Summary</h2>
  //                 </ListGroup.Item>

  //                 <ListGroup.Item>
  //                   <Row>
  //                     <Col>Total</Col>
  //                     <Col>${order.totalPrice}</Col>
  //                   </Row>
  //                 </ListGroup.Item>
  //                 {userInfo && !order.paid && (
  //                   <ListGroup.Item>
  //                     <Button
  //                       type="button"
  //                       className="btn btn-block"
  //                       onClick={payHandler}
  //                     >
  //                       Mark as Paid
  //                     </Button>
  //                   </ListGroup.Item>
  //                 )}
  //                 {loadingPay && <Loader />}
  //               </ListGroup>
  //             </Card>
  //           </Col>
  //         </Row>{" "}
  //       </div>
  //     </Container>
  //   </>
  // )
}

export default OrderScreen

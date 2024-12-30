import { useParams, Link } from "react-router-dom"
import { Row, Col, Container } from "react-bootstrap"
import Loader from "../components/Loader"
import MenuItem from "../components/MenuItem"
// import { useGetMenuQuery } from "../slices/menuApiSlice"
import { useGetProductsQuery } from "../slices/productsApiSlice"
import PlaceOrder from "../components/PlaceOrder"
import "./ThucDonScreen.css"
const MenuScreen = () => {
  const { checkinUrl } = useParams() // come from the URL
  console.log(checkinUrl)

  const { data: obj, isLoading } = useGetProductsQuery()
  let products = obj?.products

  const foodProducts = products?.filter(product => product.category === "food")
  const drinkProducts = products?.filter(
    product => product.category === "drinks"
  )
  const renderProductRows = products => {
    const rows = []
    for (let i = 0; i < products.length; i += 2) {
      rows.push(
        <Row key={i}>
          <Col md={6}>
            <MenuItem product={products[i]} />
          </Col>
          {i + 1 < products.length && (
            <Col md={6}>
              <MenuItem product={products[i + 1]} />
            </Col>
          )}
        </Row>
      )
    }
    return rows
  }

  return (
    <>
      <Link to="/" className="btn btn-light mb-4">
        Go Back
      </Link>
      <h1>Menu Chọn Món</h1>

      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <Row>
            <Col md={4}>
              <PlaceOrder checkinUrl={checkinUrl} />
            </Col>
            <Col md={8}>
              <h2 className="menu-header">Food</h2>
              {renderProductRows(foodProducts)}

              <h2 className="menu-header">Drinks</h2>
              {renderProductRows(drinkProducts)}
            </Col>
          </Row>
        </Container>
      )}
    </>
  )
}
export default MenuScreen

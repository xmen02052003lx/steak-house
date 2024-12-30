import { Link } from "react-router-dom"
import { Row, Col, Container } from "react-bootstrap"
import Loader from "../components/Loader"
import MenuItem from "../components/MenuItem"
// import { useGetMenuQuery } from "../slices/menuApiSlice"
import { useGetProductsQuery } from "../slices/productsApiSlice"
import "./ThucDonScreen.css"
const MenuScreen = () => {
  const { data: obj, isLoading } = useGetProductsQuery()
  let products = obj?.products

  console.log("obj", obj)
  console.log("products", products)

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
            <MenuItem product={products[i]} justShow={true} />
          </Col>
          {i + 1 < products.length && (
            <Col md={6}>
              <MenuItem product={products[i + 1]} justShow={true} />
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
            <h2 className="menu-header">Food</h2>
            {renderProductRows(foodProducts)}

            <h2 className="menu-header">Drinks</h2>
            {renderProductRows(drinkProducts)}
          </Row>
        </Container>
      )}
    </>
  )
}
export default MenuScreen

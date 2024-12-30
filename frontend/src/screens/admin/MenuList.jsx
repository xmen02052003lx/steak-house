import { LinkContainer } from "react-router-bootstrap"
import { Table, Button, Row, Col, Nav, Container } from "react-bootstrap"
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa"
import { useParams } from "react-router-dom"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import {
  useGetProductsQuery,
  useDeleteProductMutation
} from "../../slices/productsApiSlice"
import { toast } from "react-toastify"

const MenuList = () => {
  const { data: obj, isLoading, error, refetch } = useGetProductsQuery()
  let products = obj?.products
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation()

  const deleteHandler = async id => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteProduct(id)
        refetch()
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  return (
    <>
      <Container className="mt-5 pt-5">
        <Row className="align-items-center">
          <Col>
            <h1>Menu</h1>
          </Col>
          <Col className="text-end">
            <LinkContainer to="/manager/createmenu">
              <Button className="my-3">
                <FaPlus /> Tạo Món Mới
              </Button>
            </LinkContainer>
          </Col>
        </Row>

        {loadingDelete && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error.data.message}</Message>
        ) : (
          <>
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>DON VI</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map(item => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                    <td>{item.category}</td>
                    <td>{item.unit}</td>
                    <td>
                      <LinkContainer to={`/manager/${item._id}/edit`}>
                        <Button variant="light" className="btn-sm mx-2">
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(item._id)}
                      >
                        <FaTrash style={{ color: "white" }} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Container>
    </>
  )
}
export default MenuList

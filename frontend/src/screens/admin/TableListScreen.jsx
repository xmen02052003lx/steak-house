import { useState } from "react"
import { Link } from "react-router-dom"
import { Button, Row, Col, Table, Container, Nav } from "react-bootstrap"
import { useGetTablesQuery } from "../../slices/restaurantApiSlice"
import {
  useCheckinTableMutation,
  useUncheckinTableMutation
} from "../../slices/eatInApiSlice"
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import { LinkContainer } from "react-router-bootstrap"
import { toast } from "react-toastify"
import "./TableListScreen.css"

const TableList = () => {
  const { data: tables, isLoading, error, refetch } = useGetTablesQuery()

  const [checkin, { isLoading: loadingCheckin }] = useCheckinTableMutation()

  const [uncheckin, { isLoading: loadingUncheckin }] =
    useUncheckinTableMutation()

  const checkinHandler = async id => {
    try {
      await checkin(id).unwrap()
      toast.success("Checkin successfully")
      refetch()
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  const uncheckinHandler = async id => {
    try {
      await uncheckin(id).unwrap()
      toast.success("Uncheckin successfully")
      refetch()
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <>
      <Container>
        <div className="mt-5 pt-5 mb-5 pb-5">
          <h1>List Bàn</h1>
          {loadingCheckin && <Loader />}
          {loadingUncheckin && <Loader />}

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
                    <th>STATUS</th>

                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {tables.map(table => (
                    <tr key={table._id}>
                      <td>{table.tableNumber}</td>
                      <td>
                        <div className={`${table.status}`}>
                          <span className={`${table.status}-sign`}>
                            {table.status}
                          </span>
                        </div>
                      </td>
                      <td>
                        {table.status === "available" ? (
                          <Button onClick={() => checkinHandler(table._id)}>
                            Checkin
                          </Button>
                        ) : (
                          <Row>
                            <Col>
                              <LinkContainer to={`/eatin/tables/${table._id}`}>
                                <Nav.Link>
                                  <Button>Order</Button>
                                </Nav.Link>
                              </LinkContainer>
                            </Col>
                            <Col>
                              <Button
                                onClick={() => uncheckinHandler(table._id)}
                              >
                                uncheckin
                              </Button>
                            </Col>
                          </Row>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </div>
      </Container>
    </>
  )
}
export default TableList

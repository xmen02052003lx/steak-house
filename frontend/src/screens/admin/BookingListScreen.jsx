import "./BookingListScreen.css"
import { LinkContainer } from "react-router-bootstrap"
import { Table, Button, Container } from "react-bootstrap"
import { FaTimes } from "react-icons/fa"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { useGetBookingsQuery } from "../../slices/eatInApiSlice"

const BookingsListScreen = () => {
  const { data: bookings, isLoading, error } = useGetBookingsQuery()

  return (
    <>
      <Container>
        <div className="mt-5 pt-5 mb-5 pb-5">
          <h1>Danh Sách Đặt Bàn</h1>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">
              {error?.data?.message || error.error}
            </Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th style={{ width: "1px", whiteSpace: "nowrap" }}>ID</th>
                  <th style={{ width: "1px", whiteSpace: "nowrap" }}>TÊN</th>
                  <th style={{ width: "1px", whiteSpace: "nowrap" }}>SĐT</th>
                  <th style={{ width: "1px", whiteSpace: "nowrap" }}>EMAIL</th>
                  <th style={{ width: "1px", whiteSpace: "nowrap" }}>DATE</th>
                  <th style={{ width: "1px", whiteSpace: "nowrap" }}>TIME</th>
                  <th style={{ width: "1px", whiteSpace: "nowrap" }}>
                    Số Người
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking._id}>
                    <td style={{ width: "1px", whiteSpace: "nowrap" }}>
                      {booking._id}
                    </td>
                    <td style={{ width: "1px", whiteSpace: "nowrap" }}>
                      {booking.name}
                    </td>
                    <td style={{ width: "1px", whiteSpace: "nowrap" }}>
                      {booking.phone}
                    </td>
                    <td style={{ width: "1px", whiteSpace: "nowrap" }}>
                      {booking.email}
                    </td>
                    <td style={{ width: "1px", whiteSpace: "nowrap" }}>
                      {booking.date.substring(0, 10)}
                    </td>
                    <td style={{ width: "1px", whiteSpace: "nowrap" }}>
                      {booking.time}
                    </td>
                    <td style={{ width: "1px", whiteSpace: "nowrap" }}>
                      {booking.numberOfGuests}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </Container>
    </>
  )
}

export default BookingsListScreen

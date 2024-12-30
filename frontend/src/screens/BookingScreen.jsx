import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import { toast } from "react-toastify"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "./BookingScreen.css" // Custom styles
import { useCreateBookingMutation } from "../slices/eatInApiSlice"
import {
  useGetRestaurantDetailsQuery,
  useUpdateRestaurantMutation
} from "../slices/restaurantApiSlice"

const BookingScreen = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: new Date(),
    time: "08:00",
    numberOfGuests: "1"
  })

  const [timeOptions, setTimeOptions] = useState([])

  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState({})

  const { data: restaurant } = useGetRestaurantDetailsQuery()

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    validateField(name, value)
  }

  const handleDateChange = date => {
    setFormData({
      ...formData,
      date: date
    })
  }

  const validateField = (name, value) => {
    const errors = {}
    const success = {}

    switch (name) {
      case "name":
        if (!value) {
          errors.name = "Name is required"
        } else {
          success.name = "Name looks good!"
        }
        break
      case "phone":
        if (!value) {
          errors.phone = "Phone number is required"
        } else if (!/^\d{10}$/.test(value)) {
          errors.phone = "Phone number is invalid"
        } else {
          success.phone = "Phone number looks good!"
        }
        break
      case "email":
        if (!value) {
          errors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errors.email = "Email address is invalid"
        } else {
          success.email = "Email looks good!"
        }
        break
      default:
        break
    }

    setErrors(prev => ({ ...prev, [name]: errors[name] }))
    setSuccess(prev => ({ ...prev, [name]: success[name] }))
  }

  const validateForm = () => {
    const errors = {}
    const success = {}

    if (!formData.name) {
      errors.name = "Name is required"
    } else {
      success.name = "Name looks good!"
    }

    if (!formData.phone) {
      errors.phone = "Phone number is required"
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone number is invalid"
    } else {
      success.phone = "Phone number looks good!"
    }

    if (!formData.email) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid"
    } else {
      success.email = "Email looks good!"
    }

    setErrors(errors)
    setSuccess(success)

    return { errors, success }
  }

  const [createBooking, { isLoading: loadingBooking }] =
    useCreateBookingMutation()

  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    const { errors } = validateForm()
    if (Object.keys(errors).length > 0) {
      return
    }

    try {
      await createBooking(formData).unwrap()
      toast.success("Đặt bàn thành công")
      toast.success("Chúng tôi sẽ liên hệ với bạn trong giây lát")
      navigate("/")
    } catch (err) {
      toast.error("Khong hop le")
    }
  }

  // Helper function to generate time options
  const generateTimeSlots = (openTime, closeTime) => {
    const timeSlots = []
    let [openHour, openMinute] = openTime.split(":").map(Number)
    let [closeHour, closeMinute] = closeTime.split(":").map(Number)

    const openMinutes = openHour * 60 + openMinute
    const closeMinutes = closeHour * 60 + closeMinute

    for (let time = openMinutes; time <= closeMinutes; time += 30) {
      const hours = Math.floor(time / 60)
      const minutes = time % 60
      timeSlots.push(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`
      )
    }

    return timeSlots
  }

  // Update time options based on restaurant open and close times
  useEffect(() => {
    if (restaurant?.openTime && restaurant?.closeTime) {
      const timeSlots = generateTimeSlots(
        restaurant.openTime,
        restaurant.closeTime
      )
      setTimeOptions(timeSlots)
      setFormData({ ...formData, time: timeSlots[0] }) // Set default time
    }
  }, [restaurant])

  return (
    <div className="booking-screen">
      <Link to="/" className="btn btn-light mt-5 back-button">
        Go Back
      </Link>
      <FormContainer>
        <h1 className="text-center">Đặt Bàn</h1>
        {/* {loadingBooking && <Loader />} */}

        <Form onSubmit={handleSubmit} className="booking-form">
          <Form.Group controlId="name">
            <Form.Label>Tên Người Đặt</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="Nhập tên"
              value={formData.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
              isValid={!!success.name}
              className="form-control-custom"
            />
            {errors.name && (
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            )}
            {success.name && (
              <Form.Control.Feedback type="valid">
                {success.name}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group controlId="phone">
            <Form.Label>Số Điện Thoại</Form.Label>
            <Form.Control
              name="phone"
              type="text"
              placeholder="Nhập số điện thoại"
              value={formData.phone}
              onChange={handleChange}
              isInvalid={!!errors.phone}
              isValid={!!success.phone}
              className="form-control-custom"
            />
            {errors.phone && (
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            )}
            {success.phone && (
              <Form.Control.Feedback type="valid">
                {success.phone}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Nhập email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              isValid={!!success.email}
              className="form-control-custom"
            />
            {errors.email && (
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            )}
            {success.email && (
              <Form.Control.Feedback type="valid">
                {success.email}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group controlId="date">
            <Form.Label>Date</Form.Label>
            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              className="form-control-custom"
              minDate={new Date()} // Disable past dates
            />
          </Form.Group>

          <Form.Group controlId="numberOfGuests">
            <Form.Label>Số Người</Form.Label>
            <Form.Control
              name="numberOfGuests"
              as="select"
              value={formData.numberOfGuests}
              onChange={handleChange}
              className="form-control-custom"
            >
              {Array.from({ length: 20 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          {/* <Form.Group controlId="time">
            <Form.Label>Thời Gian</Form.Label>
            <Form.Control
              name="time"
              as="select"
              value={formData.time}
              onChange={handleChange}
              className="form-control-custom"
            >
              {Array.from({ length: 31 }, (_, i) => {
                const hour = Math.floor(i / 2) + 8
                const minutes = i % 2 === 0 ? "00" : "30"
                const time = `${hour < 10 ? `0${hour}` : hour}:${minutes}`
                return (
                  <option key={time} value={time}>
                    {time}
                  </option>
                )
              })}
            </Form.Control>
          </Form.Group> */}

          <Form.Group controlId="time">
            <Form.Label>Thời Gian</Form.Label>
            <Form.Control
              name="time"
              as="select"
              value={formData.time}
              onChange={handleChange}
              className="form-control-custom"
            >
              {timeOptions.map(time => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="submit-button my-2"
          >
            Đặt Bàn
          </Button>
        </Form>
      </FormContainer>
    </div>
  )
}

export default BookingScreen

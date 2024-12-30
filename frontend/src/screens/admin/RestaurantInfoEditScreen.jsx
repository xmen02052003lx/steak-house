import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Form, Button, Container } from "react-bootstrap"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import FormContainer from "../../components/FormContainer"
import { toast } from "react-toastify"
import {
  useGetRestaurantDetailsQuery,
  useUpdateRestaurantMutation
} from "../../slices/restaurantApiSlice"

const ProductEditScreen = () => {
  const [restaurant, setRestaurant] = useState({
    name: "",
    address: "",
    openTime: "",
    closeTime: "",
    description: "",
    image: "",
    tableCount: 0,
    phone: "",
    email: ""
  })

  const navigate = useNavigate()

  const {
    data: restaurantDetails,
    isLoading,
    refetch,
    error
  } = useGetRestaurantDetailsQuery()

  useEffect(() => {
    if (restaurantDetails) {
      setRestaurant(restaurantDetails)
    }
  }, [restaurantDetails])

  const [updateRestaurant, { isLoading: loadingUpdate }] =
    useUpdateRestaurantMutation()

  const handleChange = e => {
    const { name, value } = e.target
    setRestaurant({ ...restaurant, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await updateRestaurant(restaurant)
      toast.success("Restaurant's details updated")
      console.log(restaurant)
      refetch()
      navigate("/")
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <div className="mt-5 pt-5">
      <FormContainer>
        <h1>Edit Restaurant Information</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error.data.message}</Message>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={restaurant.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={restaurant.address}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="openTime">
              <Form.Label>Open Time</Form.Label>
              <Form.Control
                type="text"
                name="openTime"
                value={restaurant.openTime}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="closeTime">
              <Form.Label>Close Time</Form.Label>
              <Form.Control
                type="text"
                name="closeTime"
                value={restaurant.closeTime}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={restaurant.description}
                onChange={handleChange}
              />
            </Form.Group>

            {/* <Form.Group controlId="images">
              <Form.Label>Images</Form.Label>
              <Form.Control
                type="text"
                name="images"
                value={restaurant.images.join(", ")}
                onChange={e =>
                  setRestaurant({
                    ...restaurant,
                    images: e.target.value.split(", ")
                  })
                }
              />
            </Form.Group> */}

            <Form.Group controlId="tableCount">
              <Form.Label>Table Count</Form.Label>
              <Form.Control
                type="number"
                name="tableCount"
                value={restaurant.tableCount}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="phone">
              <Form.Label>SĐT</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={restaurant.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={restaurant.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  )
}

export default ProductEditScreen

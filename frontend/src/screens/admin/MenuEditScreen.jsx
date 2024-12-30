import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import Loader from "../../components/Loader"
import FormContainer from "../../components/FormContainer"
import { toast } from "react-toastify"
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery
} from "../../slices/productsApiSlice"

const MenuEditScreen = () => {
  const { id: productId } = useParams()
  const [image, setImage] = useState(null)

  const [formData, setFormData] = useState({
    name: "",
    category: "food",
    description: "",
    unit: "dĩa",
    price: ""
  })

  const {
    data: product,
    isLoading,
    refetch,
    error
  } = useGetProductDetailsQuery(productId)

  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState({})

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    validateField(name, value)
  }

  const handleFileChange = e => {
    setImage(e.target.files[0])
  }

  const validateField = (name, value) => {
    const errors = {}
    const success = {}

    switch (name) {
      case "price":
        if (isNaN(value) || value <= 0) {
          errors.price = "Price must be a positive number"
        } else {
          success.price = "Price looks good!"
        }
        break

      default:
        break
    }

    setErrors(prev => ({ ...prev, [name]: errors[name] }))
    setSuccess(prev => ({ ...prev, [name]: success[name] }))
  }

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation(productId)
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    const formDataWithImage = new FormData()
    for (const key in formData) {
      formDataWithImage.append(key, formData[key])
    }
    formDataWithImage.append("image", image)
    formDataWithImage.append("productId", productId)
    // Convert FormData to object
    const formDataObj = {}
    formDataWithImage.forEach((value, key) => {
      formDataObj[key] = value
    })
    try {
      await updateProduct(formDataWithImage).unwrap() // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success("Menu updated")
      navigate("/manager/menu")
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        category: product.category || "food",
        description: product.description || "",
        unit: product.unit || "dĩa",
        price: product.price || ""
      })
      setImage(product.image || null)
    }
  }, [product])

  return (
    <>
      <Link to="/manager/menu" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              name="price"
              type="number"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleChange}
              isInvalid={!!errors.price}
              isValid={!!success.price}
            ></Form.Control>
            {errors.price && (
              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
            )}
            {success.price && (
              <Form.Control.Feedback type="valid">
                {success.price}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              name="image"
              label="Choose File"
              onChange={handleFileChange}
              type="file"
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              name="category"
              as="select"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="food">Thức ăn</option>
              <option value="drinks">Đồ Uống</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              type="text"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="unit">
            <Form.Label>Đơn vị</Form.Label>
            <Form.Control
              name="unit"
              as="select"
              value={formData.unit}
              onChange={handleChange}
            >
              <option value="dĩa">Dĩa</option>
              <option value="ly">Ly</option>
            </Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" style={{ marginTop: "1rem" }}>
            Update
          </Button>
        </Form>
        {/* {loadingUpdate && <Loader />} */}
      </FormContainer>
    </>
  )
}

export default MenuEditScreen

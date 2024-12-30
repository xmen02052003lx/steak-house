import "./LoginScreen.css"
import { useState, useEffect } from "react"
import { useLocation, useNavigate, Link } from "react-router-dom"
import { Form, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import { useLoginMutation } from "../slices/usersApiSlice"
import { setCredentials } from "../slices/authSlice"
import { toast } from "react-toastify"

const LoginScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState({})

  const dispatch = useDispatch() // useDispatch: dispatch actions such as the login in that slice and the set credentials
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()

  const { userInfo } = useSelector(state => state.auth) // useSelector: get stuff from the state

  const { search } = useLocation()
  const sp = new URLSearchParams(search) // sp: search params
  const redirect = sp.get("redirect") || "/"

  useEffect(() => {
    // check to see if we are logged in
    // if userInfo in local storage
    if (userInfo) {
      // navigate to whatever inside the "rediect"param (redirect=...)
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])

  const validate = () => {
    const errors = {}
    const success = {}
    if (!email) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid"
    } else {
      success.email = "Email looks good!"
    }

    if (!password) {
      errors.password = "Password is required"
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters"
    } else {
      success.password = "Password looks good!"
    }
    return { errors, success }
  }

  const submitHandler = async e => {
    e.preventDefault()
    const { errors, success } = validate()
    setErrors(errors)
    setSuccess(success)

    if (Object.keys(errors).length > 0) {
      return
    }
    try {
      console.log(email)
      console.log(password)
      const res = await login({ email, password }).unwrap()
      dispatch(setCredentials({ ...res }))
      navigate(redirect)
    } catch (err) {
      toast.error(err?.data?.message || err.error)

      // toast.error("Wrong email or password")
    }
  }

  const handleEmailChange = e => {
    setEmail(e.target.value)
    const { errors, success } = validate()
    setErrors(prev => ({ ...prev, email: errors.email }))
    setSuccess(prev => ({ ...prev, email: success.email }))
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
    const { errors, success } = validate()
    setErrors(prev => ({ ...prev, password: errors.password }))
    setSuccess(prev => ({ ...prev, password: success.password }))
  }

  return (
    <div className="mb-5 pb-5 mt-5">
      <FormContainer>
        <Row>
          <Col md={4} xs={5} className="auth-logo">
            <p className="special-font display-1">Steak House</p>
          </Col>{" "}
          <Col md={8} xs={7} className="">
            <Form onSubmit={submitHandler} className="mt-5 pt-5">
              <h1>Sign In</h1>
              <Form.Group className="my-2" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={handleEmailChange}
                  isInvalid={!!errors.email}
                  isValid={!!success.email}
                ></Form.Control>
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

              <Form.Group className="my-2" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={handlePasswordChange}
                  isInvalid={!!errors.password}
                  isValid={!!success.password}
                ></Form.Control>
                {errors.password && (
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                )}
                {success.password && (
                  <Form.Control.Feedback type="valid">
                    {success.password}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <button
                disabled={isLoading}
                type="submit"
                className="mt-3 custom-button"
              >
                Sign In
              </button>

              {isLoading && <Loader />}
            </Form>
          </Col>
        </Row>
        <Row className="py-3">
          <Col>
            New Customer?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  )
}

export default LoginScreen

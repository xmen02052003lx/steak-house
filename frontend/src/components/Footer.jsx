import { Container, Row, Col, Nav } from "react-bootstrap"
import { LiaFacebookSquare } from "react-icons/lia"
import { LinkContainer } from "react-router-bootstrap"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <>
      <footer
        style={{ backgroundColor: "#111", color: "white", height: "auto" }}
        className="pt-5 pb-5"
      >
        <Container className="pb-5">
          <Row>
            <Col md={4}>
              <p className="fw-bold fs-5">Theo doi chung toi tai : </p>
              <LiaFacebookSquare size={24} /> Facebook
            </Col>
            <Col md={4}>
              <p className="fw-bold fs-5">Lien he chung toi :</p>
              <p>steakhouse@gmail.com</p>
            </Col>
            <Col md={4}>
              <LinkContainer to="/">
                <Nav.Link>
                  <span>Trang chủ</span>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/thucdon">
                <Nav.Link>
                  <span>Thực Đơn</span>
                </Nav.Link>
              </LinkContainer>
            </Col>
          </Row>
        </Container>
      </footer>
      <p className="text-center m-0 p-0 text-black">
        &copy; {currentYear} Steak House. All rights reserved
      </p>
    </>
  )
}
export default Footer

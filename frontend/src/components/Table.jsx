import { useState } from "react"
import { Card, Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
const Table = ({ menu }) => {
  return (
    <Card className="my-3 p-3 rounded height">
      <Card.Body>
        <Link to={`/menu/:id`}>
          <Card.Title as="div" className="menu-title">
            <strong>table_code</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">customer_count</Card.Text>
        <Card.Text as="h3">status</Card.Text>
      </Card.Body>
    </Card>
  )
}
export default Table

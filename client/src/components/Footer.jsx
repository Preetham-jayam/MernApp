import React from 'react'
import {Container,Row,Col} from 'react-bootstrap'

const Footer = () => {
    const currentYear=new Date().getFullYear();
  return (
    <footer>
        <Container >
            <Row>
                <Col style={{color:'black'}} className="text-center py-3">
                    <p>TechieShop &copy; {currentYear}</p>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer
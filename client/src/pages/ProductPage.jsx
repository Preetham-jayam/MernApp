import React from 'react';
import { useParams,Link } from 'react-router-dom';
import { useGetProductQuery } from '../slices/ProductsApiSlice';
import {Row,Col,Image,ListGroup,Card,Button} from "react-bootstrap";
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
const ProductPage = () => {

    const {id: productId}=useParams();
  const {data:product,isLoading,error}=useGetProductQuery(productId);

  return (
    <>
       <Link className="btn btn-light my-3" to='/'>
        Go Back
      </Link>

      {isLoading ? (<Loader/>) : error ? (<Message variant='danger'>{error?.data?.message || error.message}</Message>) :(
        
        <Row>
        <Col md={5}>
            <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={4}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews}`}/>
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>Description:{product.description}</ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Row>
                            <Col>Price: </Col>
                            <Col>
                            <strong>${product.price}</strong></Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Status: </Col>
                            <Col>
                            <strong>{product.countInStock>0 ?' In stock' : 'Out of Stock'}</strong></Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Button className='btn-block' type='button' disabled={product.countInStock===0}>
                            Add to Cart
                        </Button>
                    </ListGroup.Item>

                </ListGroup>
            </Card>
        </Col>
      </Row>
        
      ) }
     
    
       
    </>

   
  )
}

export default ProductPage
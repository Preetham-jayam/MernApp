import React from 'react'
import {Row,Col} from 'react-bootstrap';
import { useParams,Link } from 'react-router-dom';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/ProductsApiSlice';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import Message from '../components/Message';
import ProductCarousel from '../components/ProductCarousel';

const HomePage = () => {
  
  const { pageNumber ,keyword} = useParams();

  console.log(pageNumber);

  const { data, isLoading, error } = useGetProductsQuery({
   keyword, pageNumber
  });

  
  return (
    <>
     {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
    {isLoading ? (<Loader/>) : error ? (<Message variant='danger'>{error?.data?.message||error.error}</Message>) : (<>
    <h1 style={{color:'black'}}>Latest Products</h1>
    <Row>
     {data.products.map((product)=>(
         <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
            <Product product={product} />
         </Col>
     ))}
    </Row>
    <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''}/>
    </>)}
       
    </>
  )
}

export default HomePage
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { useGetTopProductsQuery } from "../slices/ProductsApiSlice";

const ProductCarousel = () => {
  const carouselStyle = {
    backgroundColor: "gray",
    borderRadius: "10px",
    padding: "20px",
  };
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel pause="hover" className="mb-4" style={carouselStyle}>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <div className="d-flex justify-content-center align-items-center">
              <Image src={product.image} alt={product.name} fluid />
            </div>
            <Carousel.Caption className="carousel-caption">
              <div className="text-center text-white">
                <h2>{product.name}</h2>
                <p>${product.price}</p>
              </div>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;

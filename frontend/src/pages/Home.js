import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import categories from '../categories';
import { LinkContainer } from 'react-router-bootstrap';
import './Home.css';
import banner from '../images/dinner_is_served-wallpaper-2048x1152.jpg';
import banner2 from '../images/good_food-wallpaper-2560x1440.jpg'
import { useDispatch, useSelector } from 'react-redux';
import axios from '../axios';
import { updateProducts } from '../features/productSlice';
import ProductPreview from '../components/ProductPreview';

function Home() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);

    useEffect(() => {
        axios.get("/api/products/").then(({ data }) => dispatch(updateProducts(data)))
    }, []);

  return (
    <div>
        <img src={banner} alt="A banner displaying information about our products" className="home-banner" />
        <div className="featured-products-container container mt-4">
            <h2>Last Products</h2>
            <div className='d-flex justify-content-center flex-wrap'>
            {products.map((product) => {
                return <ProductPreview {...product}/>
            })}
            </div>
        </div>
        <div>
            <Link to="/category/all" style={{textAlign: "right", display: "block", textDecoration: "none"}}>See more {">>"}</Link>
        </div>
        <div className="sale__banner--container mt-4">
                <img src={banner2} alt=""/>
            </div>
            <div className="recent-products-container container mt-4">
                <h2>Categories</h2>
                <Row>
                    {categories.map((category, index) => (
                        <LinkContainer key={index} to={`/category/${category.name.toLocaleLowerCase()}`}>
                            <Col md={4}>
                                <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`, gap: "10px" }} className="category-tile">
                                    {category.name}
                                </div>
                            </Col>
                        </LinkContainer>
                    ))}
                </Row>
            </div>
        </div>
  )
}

export default Home
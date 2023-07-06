import React, { useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import categories from '../categories';
import { LinkContainer } from 'react-router-bootstrap';
import './Home.css';
import banner from '../images/dinner_is_served-wallpaper-2048x1152.jpg';
import banner2 from '../images/good_food-wallpaper-2560x1440.jpg';
import Next from '../images/next.png';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../axios';
import { updateProducts } from '../features/productSlice';
import ProductPreview from '../components/ProductPreview';
import Footer from '../components/Footer';

function Home() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);

    useEffect(() => {
        axios.get("/api/products/").then(({ data }) => dispatch(updateProducts(data)))
    });

  return (
    <Container className='container'>
    <div className='all-home'>
        <div className="image-text">
            <h1 className='text mt-5 mb-5'>
                Good Food <br/><span className='good-mood'>Good Mood <br/></span>
                <span style={{color: "aliceblue", fontSize: "24px"}}>I would think that conserving our natural resources should be a conservative position:<br/> Not to waste food, and not to throw away a lot of the food that we buy.</span>
            </h1>
        </div>
        <div className="featured-products-container container mt-5">
            <h2>Best Menu Sales</h2>
            <img src={banner} alt="A banner displaying information about our products" className="home-banner mt-4"/>
        </div>
        <div className="featured-products-container container mt-5">
            <h2>Last Products</h2>
            <div className='d-flex justify-content-center flex-wrap mt-4'>
            {products.map((product) => {
                return <ProductPreview {...product}/>
            })}
            </div>
        </div>
        <div>
            <Button className='btn-see-more mt-4 mb-3' variant='warning'>
                <Link to={`/products/`} style={{fontSize: "15px", fontWeight: "bold", textAlign: "justify", display: "block", textDecoration: "none", color: "black"}}>See more <img src={Next} alt='next' style={{verticalAlign: "middle", marginLeft: "5px", width: "15px"}} /></Link>
            </Button>
        </div>
        <div className="sale__banner--container mt-5 mb-5">
            <h2>Upcoming Menu</h2>
            <img src={banner2} alt="" className='mt-4'/>
        </div>
            <div className="recent-products-container container mt-5">
                <h2>Categories</h2>
                <Row>
                    {categories.map((category, index) => (
                        <LinkContainer key={index} to={`/category/${category.name.toLocaleLowerCase()}`}>
                            <Col md={3}>
                                <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`, gap: "10px" }} className="category-tile mt-5 mb-5">
                                    {category.name}
                                </div>
                            </Col>
                        </LinkContainer>
                    ))}
                </Row>
            </div>
        </div>
        <div>
            <Footer />
        </div>
    </Container>
  )
}

export default Home
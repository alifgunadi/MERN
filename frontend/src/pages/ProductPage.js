import axios from '../axios';
import React, { useEffect, useState } from 'react'
// import AliceCarousel from 'react-alice-carousel';
import { Badge, Button, ButtonGroup, Col, Container, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading';
import './ProductPage.css';
import { LinkContainer } from 'react-router-bootstrap';
import { EditProduct } from './EditProduct';
// import SimilarProduct from '../components/SimilarProduct';

function ProductPage() {
    const {id} = useParams();
    const user = useSelector((state) => state.user);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    // const [similar, setSimilar] = useState(null);

    // const handleDragStart = (e) => e.preventDefault();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/products/${id}`);
                setProduct(response.data);
                // setSimilar(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [id]);

    if(!product) {
        return <Loading />
    };

    const addToCart = async () => {
        try {
          const response = await axios.post('/api/cart', {
            product: product._id,
            qty: quantity
          });
          console.log(response.data); // Handle the response as needed
        } catch (error) {
          console.error(error);
        }
    };


    // const responsive = {
    //     0: {items: 1},
    //     568: {items: 2},
    //     1024: {items: 3},
    // }
    
    // const images = product.image_url.map((pictures) => (
    //     <img
    //       key={pictures.url}
    //       alt='Product'
    //       className='product__carousel--image'
    //       src={pictures.url}
    //       onDragStart={handleDragStart}
    //     />
    // ));
          
    // let similarProducts = [];
    // if (Array.isArray(similar)) {
    //     similarProducts = similar.map((product, idx) => (
    //         <div className='item' data-value={idx}>
    //             <SimilarProduct {...product}/>
    //         </div>            
    //     ));
    // }
    

  return (
    <div>
    <Container className='pt-5 mt-5' style={{ position : 'relative'}}>
        <Row>
        <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '5px' }} className='product--image'>
                <img src={product.image_url} alt='ImageProduct' className='product'/>
            </Col>
            <Col className='pt-4'>
                
                <h1>{product.name}</h1>
                <p>
                    <Badge bg='primary'>{product.category.name}</Badge>
                </p>
                <p className='product__price'>
                    Rp.{product.price}
                </p>
                <p style={{textAlign: 'center'}} className='pt-1'>
                    <strong>Description:</strong> <br/>{product.description}
                </p>
                {user && !user.admin && (
                <ButtonGroup style={{ width: '90%' }}>
                    <Form.Control className='text-center' style={{ width: '40%', borderRadius: '0' }} type='number' value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} min={1} />
                    <Button size='lg' onClick={addToCart}>
                    Add to cart
                    </Button>
                </ButtonGroup>
                )}
                {user && user.admin && (
                    <LinkContainer to={`/products/${product._id}/edit`}>
                            <Button size='lg'>Edit</Button>
                    </LinkContainer>
                )}
            </Col>
        </Row>
        {/* <div className='my-4'>
            <h2>Similar Products</h2>
            <div className='d-flex justify-content-center align-items-center flex-wrap'>
                <AliceCarousel mouseTracking items={similarProducts} responsive={responsive} controlsStrategy='alternate'/>
            </div>
        </div> */}
    </Container>

    </div>
  )
}

export default ProductPage;
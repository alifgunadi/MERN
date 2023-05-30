import axios from '../axios';
import React, { useEffect, useState } from 'react'
import { Badge, Button, ButtonGroup, Col, Container, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading';
import './ProductPage.css';
import { LinkContainer } from 'react-router-bootstrap';
import { useAddToCartMutation } from '../services/appApi';

function ProductPage() {
    const { id } = useParams();
    const user = useSelector((state) => state.user);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [addToCart, { isSuccess }] = useAddToCartMutation(); // <-- Added parentheses after useAddToCartMutation

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/products/${id}`);
                setProduct(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [id]);

    if (!product) {
        return <Loading />
    };

    return (
        <div>
            <Container className='pt-5 mt-5' style={{ position: 'relative' }}>
                <Row>
                    <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '5px' }} className='product--image'>
                        <img src={product.image_url} alt='ImageProduct' className='product' />
                    </Col>
                    <Col className='pt-4'>
                        <h1>{product.name}</h1>
                        <p>
                            <Badge bg='primary'>{product.category.name}</Badge>
                        </p>
                        <p className='product__price'>
                            Rp.{product.price}
                        </p>
                        <p style={{ textAlign: 'center' }} className='pt-1'>
                            <strong>Description:</strong> <br />{product.description}
                        </p>
                        {user && !user.admin && (
                            <ButtonGroup style={{ width: '90%' }}>
                                <Form.Control className='text-center' style={{ width: '75%', borderRadius: '0' }} type='number' value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} min={1} />
                                <Button size='lg' onClick={() => addToCart({ userId: user._id, productId: product._id, price: product.price, image: product.image_url[0].url })}>
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
            </Container>
        </div>
    )
}

export default ProductPage;

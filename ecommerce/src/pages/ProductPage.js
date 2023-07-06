import axios from '../axios';
import React, { useEffect, useState } from 'react'
import { Alert, Badge, Button, ButtonGroup, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading';
import './ProductPage.css';
import { LinkContainer } from 'react-router-bootstrap';
import { useAddToCartMutation, useDeleteProductMutation } from '../services/appApi';
import ToastMessage from '../components/ToastMessage';
import UilCart from '@iconscout/react-unicons/icons/uil-shopping-cart-alt';

function ProductPage() {
    const { id } = useParams();
    const user = useSelector((state) => state.user);
    const [product, setProduct] = useState(null);
    const [addToCart, { isSuccess: addToCartSuccess }] = useAddToCartMutation();
    const [deleteProduct, { isSuccess: deleteProductSuccess, isError: deleteProductError }] = useDeleteProductMutation();

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
                {deleteProductSuccess && <Alert variant='success'>Delete Success</Alert>}
                {deleteProductError && <Alert variant='danger'>Delete Product Error</Alert>}
                <Row style={{fontFamily: "Rubik"}}>
                    <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '5px' }} className='product--image'>
                        <img src={product.image_url} alt='ImageProduct' className='product--image_url' />
                    </Col>
                    <Col className='pt-4'>
                        <h1>{product.name}</h1>
                        <p>
                            <Badge bg='warning' style={{color: "black"}}>{product.category.name}</Badge>
                        </p>
                        <p className='product__price'>
                            Rp.&nbsp;{product.price}
                        </p>
                        <p style={{ textAlign: 'center' }} className='pt-1'>
                            <strong>Description:</strong> <br />{product.description}
                        </p>
                        {user && !user.admin && (
                            <ButtonGroup style={{ width: '90%' }}>
                                <Button className='btn-add-to-cart' variant='success' size='lg' onClick={() => addToCart({ userId: user._id, productId: product._id, price: product.price, image: product.image_url[0].url })}>
                                    Add to cart&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<UilCart size={23}/>
                                </Button>
                            </ButtonGroup>
                        )}
                        {user && user.admin && (
                            <Row>
                                <Col>
                                    <LinkContainer to={`/products/${product._id}/edit`}>
                                        <Button size='lg' >Edit Product</Button>
                                    </LinkContainer>
                                </Col>
                                <Col>
                                    <Button size='lg' variant='danger' onClick={() => deleteProduct(product._id)}>Delete Product</Button>
                                </Col>
                            </Row>
                        )}
                        {addToCartSuccess && <ToastMessage bg="info" title="Added to cart" body={`${product.name} is in your cart`} />}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ProductPage;

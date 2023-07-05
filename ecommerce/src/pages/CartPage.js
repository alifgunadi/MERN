import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useMemo } from "react";
import { Alert, Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import CheckoutForm from "../components/CheckoutForm";
import { useIncreaseCartProductMutation, useDecreaseCartProductMutation, useRemoveFromCartMutation } from "../services/appApi";
import "./CartPage.css";

const stripePromise = loadStripe("pk_test_51NCeeaI5bY48nBV0PyNilHivL7k1XABhuQad6KdPPpflDP8HZunZUBkgPvpBCmGlyG0qHGy1C0PWk5lAVTEdj7cv00rIkBQ0MS");

function CartPage() {
    const user = useSelector((state) => state.user);
    const products = useSelector((state) => state.products);
    const userCartObj = user.cart;
    const cart = useMemo(() => products.filter((product) => userCartObj && userCartObj[product._id] != null), [products, userCartObj]);
    const [increaseCart] = useIncreaseCartProductMutation();
    const [decreaseCart] = useDecreaseCartProductMutation();
    const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();

    return (
        <Container style={{ minHeight: "95vh", fontFamily: "Rubik" }} className="cart-container">
            <h1 className="pb-3 h1">Your Cart</h1>
            <Row>
                <Col>
                    {cart.length === 0 ? (
                        <Alert variant="info">Shopping cart is empty. Add products to your cart</Alert>
                    ) : (
                        <Elements stripe={stripePromise}>
                            <CheckoutForm />
                        </Elements>
                    )}
                </Col>
                {cart.length > 0 && (
                    <Col md={5}>
                        <>
                            <Table responsive="sm" className="cart-table" >
                                <thead>
                                    <tr>
                                        <th>&nbsp;</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody style={{textAlign: "center", fontSize: "14px"}}>
                                    {/* loop through cart products */}
                                    {cart.map((product) => (
                                        <tr>
                                            <td>&nbsp;</td>
                                            <td>
                                                {!isLoading && 
                                                <Row>
                                                    <Col md={1}>
                                                    <i className="fa fa-times" style={{ marginRight: 10, cursor: "pointer" }} onClick={() => removeFromCart({ productId: product._id, price: product.price, userId: user._id })}>
                                                    </i>
                                                    </Col>
                                                    <Col>
                                                    <p style={{fontSize: "15px", textAlign: "left"}}>{product.name}</p>
                                                    </Col>

                                                </Row>
                                                }
                                                
                                                 {/* && product.name.length > 0 && 
                                                <img src={product.name[0].url} style={{ width: 85, height: 85, objectFit: "cover" }} alt=""/>} */}
                                            </td>
                                            <td>Rp. {product.price}</td>
                                            <td>
                                                <span className="quantity-indicator">
                                                    <i className="fa fa-minus-circle" onClick={() => decreaseCart({ productId: product._id, price: product.price, userId: user._id })}></i>
                                                    <span>&nbsp;{user.cart[product._id]}&nbsp;</span>
                                                    <i className="fa fa-plus-circle" onClick={() => increaseCart({ productId: product._id, price: product.price, userId: user._id })}></i>
                                                </span>
                                            </td>
                                            <td>Rp.&nbsp;{product.price * user.cart[product._id]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <div>
                                <h3 className="h4 pt-4">Total: Rp.&nbsp;{user.cart.total}</h3>
                            </div>
                        </>
                    </Col>
                )}
            </Row>
        </Container>
    );
}

export default CartPage;
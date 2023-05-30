import axios from '../axios';
import React, { useEffect, useMemo, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import ProductPreview from '../components/ProductPreview';
import './CategoryPage.css';

function CategoryPage() {
    const {category} = useParams();
    console.log(category);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setLoading(true);
        axios
            .get(`/api/products/?category=${category}`)
            .then(({ data }) => {
                setLoading(false);
                setProducts(data);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error.message);
            });
    }, [category]);
    const productsSearch = useMemo(() => products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())), [products, searchTerm]);
    
    if (loading) {
        return <Loading />
    };

    if (!category) {
        return <h1>Please select a category</h1>;
    }

    console.log(productsSearch);

    // num1
    // num2
    // function addition(num1, num2) {
    //     return num1 + num2
    // }

    // const addtionValue = useMemo(() => addtion(num1, num2), [num1, num2])
    // const additionCb = useCallback(addition, [num1, num2])
    // additionCb(num1, num2);
    return (
    <div className='category-page-container'>
        <div className={`pt-5 ${category}-banner-container category-banner-container`}>
            <h1 className='text-center'>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
        </div>
        <div className='filters-container d-flex justify-content-center pt-4 pb-4 '>
            <input type='search' placeholder='Search' onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>
        {productsSearch.length === 0 ? ( <h1>No products</h1> ) : 
            ( <Container>
                <Row>
                    <Col md={{span: 10, offset: 1}}>
                        <div className='d-flex justify-content-center align-item-center flex-wrap'>
                        {productsSearch.map((product) => (
                            <ProductPreview {...product}/>
                        ))}
                        </div>
                    </Col>
                </Row>
            </Container> )
        }
    </div>
  )

}

export default CategoryPage


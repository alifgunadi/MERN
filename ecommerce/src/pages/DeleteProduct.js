import React from 'react';
import axios from '../axios'
import { useDeleteProductMutation } from '../services/appApi';
import { Alert, Button, Container, Row } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteProduct = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const [deleteProduct, { isError, error, isLoading, isSuccess }] = useDeleteProductMutation();

  useEffect(() => {
    axios
        .dele(`/api/products/${id}`)
        .then(({ data }) => {
            const product = data.product;
            setName(product.name);
            setDescription(product.description);
            setCategory(product.category);
            setTags(product.tags);
            setImages(product.pictures);
            setPrice(product.price);
        })
        .catch((e) => console.log(e));
  }, [id]);

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!id || !name || !description || !price || !images.length || !category || !tags) {
      return alert("Please fill out all the fields");
    }
      try {
        const { data } = await deleteProduct({id, name, description, price, images, category, tags });
        if (data.length > 0) {
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <Container>
      <Row>
        {isError && <Alert variant="danger">{error.data}</Alert>}
        <Button.Group>
          <Button onClick={handleDelete} className='register' type="submit" disabled={isLoading || isSuccess}>
              Delete Product
          </Button>
      </Button.Group>
      </Row>
      
    </Container>
  )
}

export default DeleteProduct;

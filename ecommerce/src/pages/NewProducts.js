import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateProductMutation } from '../services/appApi';
import { Col, Container, Row, Form, Alert, Button } from 'react-bootstrap';
import './NewProducts.css';
import axios from '../axios';

function NewProducts() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [imgToRemove, setImgToRemove] = useState(null);
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();
  const [createProduct, { isError, error, isLoading, isSuccess }] = useCreateProductMutation();

  function showWidget() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloud_name: 'djlqswxds',
        uploadPreset: 'yxfkr8ew',
      },
      (error, result) => {
        if (!error && result.event === 'success') {
          console.log(result);
          setImages((prev) => [
            ...prev,
            { 
            url: result.info.url, public_id: result.info.public_id, original_filename: result.info.original_filename,
            secure_url: result.info.secure_url, 
            secure_url_with_policy: result.info.secure_url_with_policy,
            }
          ]);
        }
      }
    );
    widget.open();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !price || !images.length || !category || !tags) {
      return alert("Please fill out all the fields");
    }
      try {
        const { data } = await createProduct({ name, description, price, images, category, tags });
        if (data.length > 0) {
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      } catch (error) {
        console.log(error);
      }
  };

  const handleRemoveImg = (imgObj) => {
    setImgToRemove(imgObj.public_id);
      axios
        .delete(`/api/images/${imgObj.public_id}`)
        .then(() => {
          setImgToRemove(null);
          setImages((prev) => prev.filter((img) => img.public_id !== imgObj.public_id));
        }).catch((error) => {
          console.log(error);
        })
      }


  return (
    <div>
      <Container>
        <Row>
          <Col md={6} className='new-product_form--container'>
            <Form style={{ width: '100%' }} onSubmit={handleSubmit}>
              <h1>Create Product</h1>
              {isSuccess && (
                <Alert variant='success'>Product created is success</Alert>
              )}
              {isError && <Alert variant='danger'>{error.data}</Alert>}

              <Form.Group mb='3'>
                <Form.Label>Product Name</Form.Label>
                <Form.Control key='name'
                  type='text'
                  placeholder='Enter product name'
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Product description</Form.Label>
                <Form.Control as="textarea" placeholder="Product description" style={{ height: "100px" }} value={description} required onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>

              <Form.Group className="mb-3">
                <Button className='upload--images' type="button" onClick={showWidget}>
                    Upload Images
                </Button>
                <div className="images-preview-container">
                    {images.map((image) => (
                        <div className="image-preview">
                            <img src={image.url} alt='imageUrl'/>
                            {imgToRemove !== image.public_id && <i className="fa fa-times-circle" onClick={() => handleRemoveImg(image)}></i>}
                        </div>
                    ))}
                </div>
            </Form.Group>

            <Form.Group>
              <Form.Label>Price {'Rp.'}</Form.Label>
              <Form.Control key='price'
                type='number'
                placeholder='Enter price'
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group key='category' mb='3' onChange={(e) => setCategory(e.target.value)}>
              <Form.Label>Product category</Form.Label>
              <Form.Select>
                <option disabled selected>
                  --Select one--
                </option>
                <option value='Food'>Food</option>
                <option value='Drink'>Drink</option>
                <option value='Snack'>Snack</option>
                <option value='Dessert'>Dessert</option>
              </Form.Select>
            </Form.Group>

            <Form.Group key='tags' mb='3' onChange={(e) => setTags(e.target.value)}>
              <Form.Label>Product tags</Form.Label>
              <Form.Select>
                <option disabled selected>
                  --Select one--
                </option>
                <option value='spicy'>Spicy</option>
                <option value='ice'>Ice</option>
                <option value='hot'>Hot</option>
                <option value='fruits'>Fruits</option>
              </Form.Select>
            </Form.Group>

            <Form.Group key='submit' mb='3'>
              <Button
                type='submit'
                className='register'
                disabled={isLoading || isSuccess}
              >
                Create product
              </Button>
            </Form.Group>
            </Form>
          </Col>
          <Col md={6} className='new-product_image--container'></Col>
        </Row>
      </Container>
    </div>
  );
}

export default NewProducts;
import React from 'react';
import { Badge, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function ProductPreview({_id, name, category, tags, image_url}) {

  return (
    <div>
        <LinkContainer to={`/products/${_id}`} style={{width: '13rem', cursor: 'pointer', margin: '10px'}}>
            <Card style={{width: '20rem', margin: '10px'}}>
                <Card.Img variant='top' className='product-preview-img' src={image_url}/>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Badge bg='warning' text='dark'>{category.name}</Badge>
                    {/* <Badge bg='warning' text='dark'>{tags}</Badge> */}
                </Card.Body>
            </Card>
        </LinkContainer>
    </div>
  )
}

export default ProductPreview

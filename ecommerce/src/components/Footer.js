import React from 'react'
import { Col, Container, Form, Nav, Row } from 'react-bootstrap';
// import ElemesBrand from '../images/brand_navbar.png';
import './Footer.css';
import UilEmail from '@iconscout/react-unicons/icons/uil-envelope-alt';
import UilPhone from '@iconscout/react-unicons/icons/uil-phone';
import UilInstagram from '@iconscout/react-unicons/icons/uil-instagram';

function Footer() {
  return (
    <div>
      <div className='top-footer'>
        <Container>
          <Row>
            <Col xs={4}>
              <div>
                {/* <img className='brand-footer' src={ElemesBrand} alt='brand'/> */}
                <h1 className='brand-footer judul-category'>Restö</h1>
              </div>
              <div className='descript'>
                <p>Jl. Prof. DR. Satrio No.7, RT.3/RW.3, Karet Kuningan, <br/> 
                  Kecamatan Setiabudi, Kota Jakarta Selatan, <br/>
                  Daerah Khusus Ibukota Jakarta 12950
                </p>
              </div>
              <div>
              
                <a href='https://mail.google.com/mail/u/0/#label/AlifGunadi'><button className='button-footer'><UilEmail className="icons" size="20" color="grey" /></button></a>
                <a href='tel:+6282283612770'><button className='button-footer'><UilPhone size="20" color="grey" /></button></a>
                <a href='https://www.instagram.com/alifgunadi/?hl=id'><button className='button-footer'><UilInstagram size="20" color="grey" /></button></a>
              </div>
            </Col>
            <Col>
              <div>
                <h3 className='judul-category'>Categories</h3>
              </div>
              <div className='isi-category'>
                <Nav.Link href='/category/food'><h6 className='per-kategori'>Food</h6></Nav.Link>
                <Nav.Link href='/category/drink'><h6 className='per-kategori'>Drink</h6></Nav.Link>
                <Nav.Link href='/category/dessert'><h6 className='per-kategori'>Dessert</h6></Nav.Link>
                <Nav.Link href='/category/snack'><h6 className='per-kategori'>Snack</h6></Nav.Link>
              </div>
            </Col>
            <Col>
            <div>
                <h3 className='judul-category bawah-kecil'>About Us</h3>
              </div>
              <div className='isi-category'>
                <Nav.Link href='/category/cupcake'><h6 className='per-kategori'>About Us</h6></Nav.Link>
                <Nav.Link href='/category/cupcake'><h6 className='per-kategori'>FAQ</h6></Nav.Link>
                <Nav.Link href='/category/cupcake'><h6 className='per-kategori'>Report Platform</h6></Nav.Link>
              </div>
            </Col>
            <Col>
            <div>
                <h3 className='judul-category bawah-kecil newslatter'>Newsletter</h3>
              </div>
              <div className='isi-category'>
                <h6 className='per-kategori'>Get now free 50% discount for all <br/> products on your first order</h6>
                <h6 className='per-kategori'>FAQ</h6>
              <div>
              <Form className="d-flex per-kategori">
                <Form.Control
                  type="email"
                  placeholder="Your email address"
                  aria-label="email"
                />
                <button className='btn-send'>SEND</button>
              </Form>
              </div>
                <a href='https://mail.google.com/mail/u/0/#label/AlifGunadi' className='per-kategori'><h6 className='h6-footer'><UilEmail color="grey"/>&nbsp;&nbsp;alifgunadi1303@gmail.com</h6></a>
                <a href='tel:+6282283612770' className='per-kategori'><h6 className='h6-footer'><UilPhone color="grey"/>&nbsp;&nbsp;0822 8361 2770</h6></a>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div>
      <footer className="text-center bottom-footer">
        &copy; 2023 RESTÖ. ALL RIGHTS RESERVED.
      </footer>
      </div>
    </div>
  )
}

export default Footer;
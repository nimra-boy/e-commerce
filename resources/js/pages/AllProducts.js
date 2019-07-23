import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import '../../sass/style.css';
import eye from '../../images/eye.svg';
import caddie from '../../images/shopping-cart.svg';
import {Link} from "react-router-dom";
import { Card, Button, CardImg, CardTitle, CardText, CardDeck,
  CardSubtitle, CardBody, Container, Row, Col, Breadcrumb, BreadcrumbItem  } from 'reactstrap';
import { PushSpinner, BallSpinner, CircleSpinner } from "react-spinners-kit";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus} from '@fortawesome/free-solid-svg-icons';

class AllProducts extends Component {
  constructor(props)
  {
      super(props);

    // Initial state.
      this.state = {
          products: [],
          loading: false,

      };
  }

  componentWillMount()
  {
      this.setState({
          loading: true
      });
      axios.get('api/v1/category/all').then(response =>{
          this.setState({
              products:response.data.products,
              loading: false,
          });
      }).catch(errors => {
          console.log(errors);
      })
  }

  render() {
      const { loading } = this.state;
      return (
      <Container>
        <div className='d-flex justify-content-center'>
          <Breadcrumb>
            <BreadcrumbItem><a href="/home">Home</a></BreadcrumbItem>
            <BreadcrumbItem active>All</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="d-flex justify-content-center mt-4 mb-4">
          <h1>All Products</h1>
        </div>
        <Row>
            <div className={'loading'}>
                <CircleSpinner
                    size={70}
                    color="#00979d"
                    loading={loading}
                />
            </div>
          <CardDeck>
            {this.state.products.map(product =>
              <Col md='4' className='mb-4'>
                <div key={product.id}>
                  <Card body outline color={product.sale == 1 ? 'danger' : 'info'} className='card'>
                    <CardImg top style={{height: '250px'}} src={product.filename} alt="Arduino"/>
                    <CardBody key={product.id}>
                      <CardTitle className='d-flex justify-content-center text-center' style={{color: '#00979d', height: '50px'}}><h4>{product.title}</h4></CardTitle>
                      {product.sale == 1 &&
                        <div>
                         <CardSubtitle className='ribbon ribbon-top-left'><span>SOLD -{product.discount}%</span></CardSubtitle>
                          <CardSubtitle className='d-flex justify-content-end'><span style={{backgroundColor: '#db3434', position: 'relative', left: '40px', color:'white', padding: '5px 20px', borderTopLeftRadius: '50px 50px'}}><strike>{product.price} $</strike> {product.saleprice} $</span></CardSubtitle>
                        </div>
                      }
                      {product.sale == 0 &&
                        <div>
                          <CardSubtitle className='d-flex justify-content-end'><span style={{backgroundColor: 'mediumseagreen', position: 'relative', left: '40px', color:'white', padding: '5px 20px', borderTopLeftRadius: '50px 50px'}}>{product.price} $</span></CardSubtitle>
                        </div>
                      }
                      <hr className="my-2"/>
                      <CardText>{((product.description).length > 150) ? (((product.description).substring(0, 147)) + '...') : product.description}</CardText>
                      <hr className="my-2"/>
                      <small className="text-muted">Last updated {product.updated_at}</small>
                      <div className='d-flex justify-content-center'>
                        <Link to={'/product/' + product.id}><Button className='btn-info mt-3'><img style={{filter: 'invert(100%)'}} src={eye} alt="eye"/></Button></Link>
                        {this.state.countryName == "Israel" &&
                          <div>
                            Product not available in {this.state.countryName}
                            </div>
                        }
                        {this.state.countryName != "Israel" &&
                        <Button onClick={() => this.cart(product.id)} className='btn-warning mt-3'><img style={{filter: 'invert(100%)'}} src={caddie} alt="eye"/></Button>
                        }
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </Col>
            )}
          </CardDeck>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

export default connect(
  mapStateToProps,
)(AllProducts);

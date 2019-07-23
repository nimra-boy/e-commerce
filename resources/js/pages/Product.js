import
React, {Component}
from
'react';
import {connect} from 'react-redux';
import axios from "axios";
import '../../sass/style.css';
import OwlCarousel from 'react-owl-carousel';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faShippingFast } from '@fortawesome/free-solid-svg-icons';
import { Card, Button, CardImg, CardTitle, CardText, CardHeader,
  CardSubtitle, CardBody, Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import $ from 'jquery';
import eye from '../../images/shopping-cart.svg';


class Product extends Component {
    constructor(props)
    {
        super(props);
        // console.log(props.location.pathname);

      // Initial state.
        this.state = {
            product: {},  
            products: []

        };
        // console.log(this.state.product);
      // API endpoint.
      // this.api = 'api/v1/product';
    }

    componentDidMount()
    {
      axios.get('http://127.0.0.1:8000/api/v1/product').then(response =>{
        // response.data.products.map(ok => {console.log(ok.title)})
        this.setState({
            products:response.data
        });
    }).catch(errors => {
        console.log(errors);
    });
        let idProduct = this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf('/')+1);

        axios.get('http://127.0.0.1:8000/api/v1/product/'+idProduct).then(response =>{
            this.setState({
                product:response.data
            });
        }).catch(errors => {
            console.log(errors);
        });
    }

    color = (e) => {
      // console.log(e.target.value);
      var oldprice = this.state.product.price

      var old = parseInt(oldprice, 10);
      var newp = parseInt(e.target.value, 10);

      var newprice = old + newp + ' $';

      $('#price').html(newprice);
    }

    cart(id){
      if(this.props.isAuthenticated){


        var user = localStorage.getItem('user');


        var userParsed = JSON.parse(user);
        const products = {
          user_id: userParsed['id'],
          product_id: id,
        }

        // console.log(products);
        let uri = 'http://127.0.0.1:8000/api/v1/cart';

        axios.post(uri, products).then((response) => {

        });
      }
      else{
        var user = localStorage.getItem('unlog');
        const products = {
          user_id: user,
          product_id: id,
        }

        // console.log(products);
        let uri = 'http://127.0.0.1:8000/api/v1/cart';

        axios.post(uri, products).then((response) => {

        });
      }
    }

    render()
    {
    //   const styles = {
    //     backgroundColor: backgroundColor,
    //     fontSize: someSize,
    //     color: someColor,
    //     padding: paddings
    //  }
    var ok = this.state.products;

        return (
          <div>
            <Container className='mt-5 mb-3'>
            <Row>
              
                <Card body outline color="secondary" className='flex-row flex-wrap'>
                  <Col sm={5} className='d-flex align-middle'>
                    <CardHeader>
                      <CardImg top style={{height: '300px', width: '350px', marginTop: '25%'}} src={this.state.product.filename} alt="Arduino" />
                    </CardHeader>
                  </Col>
                  <Col sm={7}>
                    <CardBody>
                      <CardTitle className='d-flex justify-content-center'><h2 style={{color: '#00979d'}}>{this.state.product.title}</h2></CardTitle>
                      {this.state.product.sale == 1 &&
                        <div>
                          <CardSubtitle className='d-flex justify-content-end'><span style={{backgroundColor: '#db3434', position: 'relative', left: '57px', color:'white', padding: '5px 20px', borderTopLeftRadius: '50px 50px'}}><strike>{this.state.product.price} $</strike> {this.state.product.saleprice} $</span></CardSubtitle>
                        </div>
                      }
                      {this.state.product.sale == 0 &&
                        <div>
                          <CardSubtitle className='d-flex justify-content-end'><span style={{backgroundColor: 'mediumseagreen', position: 'relative', left: '55px', color:'white', padding: '5px 20px', borderTopLeftRadius: '50px 50px'}}>{this.state.product.price} $</span></CardSubtitle>
                        </div>
                      }
                      <small className="text-muted d-flex justify-content-end">Tax inclued</small>

                      {/* <Label for="color" sm={2}>Color</Label>
                        <Input type="select" name="color" id="color" onChange={this.color} required>
                          <option value={0}>Choose Cables color</option>
                          <option value={3}>Black</option>
                          <option value={4}>Red</option>
                          <option value={5}>Yellow</option>
                        </Input> */}

                      <hr className="my-2" />

                      <CardText>{this.state.product.description}</CardText>
                      <hr />
                      <CardText className="d-flex justify-content-center"><b>The installation is offered</b></CardText>
                      <hr />
                      <div style={{border: "solid 2px #00979d", height: "80px", width: "350px", float: 'left'}}>
                        <CardText className='d-flex justify-content-center pt-3 pl-1' style={{color: '#00979d'}}><FontAwesomeIcon icon={faShippingFast} style={{marginRight: '5px'}}/> Express shipping available, the product will be at your home in 2 days</CardText>
                      </div>
                      <div style={{border: "solid 2px green", height: "80px", width: "180px", float: 'right'}}>
                        <CardText className='d-flex justify-content-center pt-4' style={{color: 'green'}}>Only {this.state.product.stock} products left</CardText>
                      </div>

                      <Button onClick={() => this.cart(this.state.product.id)} className='btn-success mt-3' style={{width: '100%', height: '70px', fontSize: '20px'}}>ADD CART <FontAwesomeIcon icon={faCartPlus} style={{color: 'white'}}/></Button>
                      <hr className="my-2" />
                      {/*<CardText>{this.state.product.category}</CardText>*/}
                      <small className="text-muted">Last updated {this.state.product.updated_at}</small>


                      {/* <div name="color" style={styles}></div> */}

                    </CardBody>
                  </Col>
                </Card>
              

            </Row>
          </Container>
        
          <Container fluid>
            <Row>
              <Col md='12'>
              <h2 style={{textAlign: 'center', color: 'grey'}}>Similar product</h2>

                <OwlCarousel
                    className="owl-theme"
                    loop
                    items='4'
                    autoWidth= 'true'
                    margin={10}
                    nav
                    style={{paddingTop: '50px'}}
                  >
                    {ok.map(product =>

                    <div key={product.id} className="item card" style={{width: '25rem', height: '28rem'}}>
                      <img className="card-img-top" style={{height: '250px'}} src={product.filename} alt="Arduino"/>
                      <div className="card-body">
                        <a href={'/product/' + product.id}><h5 className="card-title text-center" style={{color: '#00979d', height: '40px'}}>{product.title}</h5></a>
                        <div className="d-flex" style={{marginBottom: '-30px'}}>
                          <div className="mr-auto p-2">
                            <p className="d-felx jstify-content-start" style={{color: 'LightCoral'}}>{product.stock} products left</p>
                          </div>
                          <div className="p-2">
                          {product.sale == 1 &&
                            <div>
                              <p className='d-flex justify-content-start'><span style={{backgroundColor: 'red', position: 'relative', right: '150px', bottom: '360px', color:'white', padding: '5px 70px', borderTopRightRadius: '50px 50px'}}>SOLD-{product.discount}%</span></p>
                              <p className='d-flex justify-content-end'><span style={{backgroundColor: 'red', position: 'relative', left: '30px', bottom: '74px', color:'white', padding: '5px 20px', borderTopLeftRadius: '50px 50px'}}><strike>{product.price} $</strike> {product.saleprice} $</span></p>
                            </div>
                          }
                          {product.sale == 0 &&
                            <div>
                              <p className='d-flex justify-content-end'><span style={{backgroundColor: 'mediumseagreen', position: 'relative', left: '30px', color:'white', padding: '5px 20px', borderTopLeftRadius: '50px 50px'}}>{product.price} $</span></p>
                            </div>
                          }
                           </div>
                        </div>

                       </div>
                     </div>)}
                </OwlCarousel>
              </Col>
            </Row>

          </Container>
          </div>
        );
    }
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
});


export default connect(
    mapStateToProps,
)(Product);


import
  React, {Component}
  from
    'react';
import {connect} from 'react-redux';
import axios from 'axios';
import eye from '../../images/eye.svg';
import pouce from '../../images/thumbs-up.svg';
import truck from '../../images/truck.svg';
import caddie from '../../images/shopping-cart.svg';
import phone from '../../images/phone.svg';
import colage from '../../images/collage1.jpg';

import dollar from '../../images/dollar-sign.svg';
import '../../sass/style.css';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import {Link} from "react-router-dom";
import { Card, Button, CardImg, CardTitle, CardText, CardDeck,
  CardSubtitle, CardBody, Container, Row, Jumbotron,
  Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption, UncontrolledCarousel,
  TabContent, TabPane, Nav, NavItem, NavLink, Col, Alert } from 'reactstrap';
  import classnames from 'classnames';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faStar, faShoppingBasket, faPhone, faUserCircle, faCartPlus } from '@fortawesome/free-solid-svg-icons';

  const items = [
    {
      src: 'https://cdn.discordapp.com/attachments/588040834201419855/596283685246992433/20190704_121439.jpg',

    },
    {
      src: "https://cdn.discordapp.com/attachments/588040834201419855/596293459225346060/20190704_125026.jpg",

    },
    {
      src: "https://cdn.discordapp.com/attachments/588040834201419855/596303979198152724/20190704_133640.jpg",

    }
  ];
  // https://www.pac-nj.com/wp-content/uploads/2018/09/SmartHome.jpg
//https://store-cdn.arduino.cc/uni/stuntcoders/banner/store_banner_family_1_.png
class Home extends Component {
    constructor(props)
    {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);

      // Initial state.
        this.state = {
            products: [],
            houses: [],
            modal: false,
            activeIndex: 0,
            user_id: '',
            product_id: '',
            visible: 'true',
            added:'added',
            countryName: '',
            countryCode: '',
            activeTab: '1'

        };
        this.cart = this.cart.bind(this);
        this.onDismiss = this.onDismiss.bind(this);

        this.toggle = this.toggle.bind(this);
        this.toggle2 = this.toggle2.bind(this);

    }

    componentWillMount()
    {
      this.getGeoInfo();

      var house = "house"

      axios.post('api/v1/product/house', house).then(response =>{
        console.log('okokk')
        this.setState({
            houses:response.data
        });

    }).catch(errors => {
        console.log(errors);
    })

      var user = localStorage.getItem('unlog');

      if(!user){
        var rand = function() {
          return Math.random().toString(36).substr(2); // remove `0.`
        };

        var token = function() {
            return rand();
        };

        var to = token();

        this.setState({
          unlogged: to
        })

        localStorage.setItem('unlog', token())

        axios.get('api/v1/product').then(response =>{
            this.setState({
                products:response.data
            });
        }).catch(errors => {
            console.log(errors);
        })
      }
      else{


        var user = localStorage.getItem('user');

          axios.get('api/v1/product').then(response =>{
            this.setState({
                products:response.data
            });
        }).catch(errors => {
            console.log(errors);
        })
      }
    }

    onDismiss() {
      this.setState({ visible: false, added: 'not' });
    }

    getGeoInfo = () => {
      axios.get('https://ipapi.co/json/').then((response) => {
          let data = response.data;
          this.setState({
              countryName: data.country_name,
              countryCode: data.country_calling_code
          });
      }).catch((error) => {
          console.log(error);
      });
  };

toggle() {
  this.setState(prevState => ({
    modal: !prevState.modal
  }));
}

toggle2(tab) {
  if (this.state.activeTab !== tab) {
    this.setState({
      activeTab: tab
    });
  }
}

    onExiting() {
      this.animating = true;
    }

    onExited() {
      this.animating = false;
    }

    next() {
      if (this.animating) return;
      const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
      this.setState({ activeIndex: nextIndex });
    }

    previous() {
      if (this.animating) return;
      const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
      this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
      if (this.animating) return;
      this.setState({ activeIndex: newIndex });
    }

    cart(id){
      if(this.props.isAuthenticated){
console.log("loggged")
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
        this.setState({
          added: "added"
        })


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
        this.setState({
          added: "added"
        })

      }
      console.log(this.state.added)

    }

    render()
    {
      const { activeIndex } = this.state;
      const slides = items.map((item) => {
        return (
          <CarouselItem
            onExiting={this.onExiting}
            onExited={this.onExited}
            key={item.src}
          >

            <img src={item.src} alt={item.altText} />

            <CarouselCaption captionText={item.caption} captionHeader={item.caption} />

          </CarouselItem>
        );
      });
        return (
          <div>
                    <style>
          {/* {
            `.ok {
                width: 1920px;
                height: 500px;
                background: black;
              }`
          } */}
        </style>
        
            <Container fluid className='mt-4'>
              <Carousel
              className="ok"
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}
              >

                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />

                {slides}

                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />

                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />

              </Carousel>
              

          </Container>
          
          <Row className='mt-2 d-flex justify-content-center'>
              <Col sm='3'>
                <div style={{textAlign: 'center', borderRight: '1px solid grey'}}>
                  {/* <button style={{borderRadius: '30px', backgroundColor: '#F1C40F', height: '50px', width: '50px', marginBottom: '5px'}}><img style={{filter: 'invert(100%)'}} src={pouce} alt="Good"/></button> */}
                  <FontAwesomeIcon icon={faStar} style={{fontSize: '30px', color: '#00979d', margin: '10px 0'}}/>
                  <p>Millions of satisfied customers who trusted us</p>
                </div>
              </Col>
              <Col sm='3'>
                <div style={{textAlign: 'center', borderRight: '1px solid grey'}}>
                  {/* <button style={{borderRadius: '30px', backgroundColor: '#F1C40F', height: '50px', width: '50px'}}><img style={{filter: 'invert(100%)'}} src={caddie} alt="Securite"/></button> */}
                  <FontAwesomeIcon icon={faShoppingBasket} style={{fontSize: '30px', color: '#00979d', margin: '10px 0'}}/>
                  <p>Secure payment with the 3D Secure Verified by Visa</p>
                </div>
              </Col>
              <Col sm='3'>
                <div style={{textAlign: 'center'}}>
                  {/* <button style={{borderRadius: '30px', backgroundColor: '#F1C40F', height: '50px', width: '50px'}}><img style={{filter: 'invert(100%)'}} src={phone} alt="Phone"/></button> */}
                  <FontAwesomeIcon icon={faPhone} style={{fontSize: '30px', color: '#00979d', margin: '10px 0'}}/>
                  <p>A customer team at your service. Available 24h/24, 7j/7</p>
                </div>
              </Col>
            </Row>
            <hr/>
          <Container>
          <Container fluid>
              <Row>
                <Col sm={12}>
                  <div className="text-center mt-5 mb-3">
                    <h2>Customers feedback on our flagship products</h2>
                    <hr width="50%" />
                  </div>
                  <div className="main-timeline">
                    <div className="timeline">
                        <a href="" className="timeline-content">
                            <div className="timeline-icon">
                                <FontAwesomeIcon icon={faUserCircle}/>
                            </div>
                            <div className="inner-content">
                                <h3 className="title"><i>Marie Christelle</i> - <b>CONNECTIVITY LORA</b></h3>
                                <p className="description">Perfect product and conform to the description.
                                                          Quality is present. I'm 40 and have fun like crazy with this toy.
                                                          The explanations are clear and very easy to follow.
                                                          I highly recommend this product.
                                                          Quickly send and received, this product is top and this site too :wink:</p>
                            </div>
                        </a>
                    </div>
                    <div className="timeline">
                        <a href="" className="timeline-content">
                            <div className="timeline-icon">
                                <FontAwesomeIcon icon={faUserCircle}/>
                            </div>
                            <div className="inner-content">
                                <h3 className="title"><i>Sebastien Loque</i> - <b>ARDUINO PRO GATEWAY LORA® CONNECTIVITY</b></h3>
                                <p className="description">Product received very quickly. Very good communication by email that encourages confidence. The product is compliant and well packaged.
                                    I tested 2 of the 3 modules ordered (Arduino PRO GATEWAY LORA® CONNECTIVITY and Ethernet Shield). Perfect operation and no surprises. I would recommend your shop without hesitation.
                                    Just fantastic.</p>
                            </div>
                        </a>
                    </div>
                    <div className="timeline">
                        <a href="" className="timeline-content">
                            <div className="timeline-icon">
                                <FontAwesomeIcon icon={faUserCircle}/>
                            </div>
                            <div className="inner-content">
                                <h3 className="title"><i>Stephanie Lambert</i> - <b>ARDUINO UNO REV3</b></h3>
                                <p className="description">We ordered this kit to introduce our son to circuit design or whatever.
                                    We were afraid that it would be too complex for a little boy, but to our surprise the instructions were wonderfully well explained.
                                    I recommend this product</p>
                            </div>
                        </a>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
            
            <div className="d-flex justify-content-center mt-4 mb-4">
              <h1 className='asjay' style={{color: '#00979d'}}>Most Popular Products</h1>
            </div>

            {/* {this.state.added == 'added' &&
            <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
              Product added with succes
          </Alert>
          } */}

            <Nav className="d-flex justify-content-center" tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle2('1'); }}
            >
              House Automation
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle2('2'); }}
            >
                          Arduino Component

            </NavLink>
          </NavItem>
        </Nav>
        <TabContent  activeTab={this.state.activeTab}>
          <TabPane tabId="1">
          <Row>
             <CardDeck>
                {this.state.houses.map(house =>
                  <Col lg='4' className='mb-4'>
                    <div key={house.id}>

                      <Card body outline color={house.sale == 1 ? 'danger' : 'info'} className='card'>
                        <CardImg top style={{height: '250px'}} src={house.filename} alt="Arduino"/>
  
                        <CardBody key={house.id}>
                          <CardTitle className='d-flex justify-content-center text-center' style={{color: '#00979d', height: '50px'}}><h4>{house.title}</h4></CardTitle>
                          {house.sale == 1 &&
                            <div>
                              <CardSubtitle className='ribbon ribbon-top-left'><span>SALE -{house.discount}%</span></CardSubtitle>
                          <CardSubtitle className='d-flex justify-content-end'><span style={{backgroundColor: '#db3434', position: 'relative', left: '40px', color:'white', padding: '5px 20px', borderTopLeftRadius: '50px 50px'}}><strike>{house.price} $</strike> {house.saleprice} $</span></CardSubtitle>
                            </div>
                          }
                          {house.sale == 0 &&
                            <div>
                              <CardSubtitle className='d-flex justify-content-end'><span style={{backgroundColor: 'mediumseagreen', position: 'relative', left: '40px', color:'white', padding: '5px 20px', borderTopLeftRadius: '50px 50px'}}>{house.price} $</span></CardSubtitle>
                            </div>
                          }
                          <hr className="my-2"/>
                          <CardText>{((house.description).length > 150) ? (((house.description).substring(0, 147)) + '...') : house.description}</CardText>
                          <hr className="my-2"/>
                          <small className="text-muted">Last updated {house.updated_at}</small>
                          <div className='d-flex justify-content-center'>
                            {this.state.countryName == "Israel" &&
                              <div>
                                house not available in {this.state.countryName}
                                </div>
                            }
                            {this.state.countryName != "Israel" &&
                            <div>
                            <Link to={'/product/' + house.id}><Button className='btn-info mt-3'>DETAILS</Button></Link>
                        <Button onClick={() => this.cart(house.id)} className='btn-success mt-3'>ADD CART <FontAwesomeIcon icon={faCartPlus} style={{color: 'white', fontSize: '20px'}}/></Button>
                            
                            </div>

                            }
 
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  </Col>
                )}
              </CardDeck>
            </Row>
          </TabPane>
          <TabPane tabId="2">
          <Row>
              <CardDeck>
                {this.state.products.map(product =>
                  <Col lg='4' className='mb-4'>
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
                            {this.state.countryName == "Israel" &&
                              <div>
                                Product not available in {this.state.countryName}
                                </div>
                            }
                            {this.state.countryName != "Israel" &&
                            <div>
                              <Link to={'/product/' + product.id}><Button className='btn-info mt-3'>DETAILS</Button></Link>
                              <Button onClick={() => this.cart(product.id)} className='btn-success mt-3'>ADD CART <FontAwesomeIcon icon={faCartPlus} style={{color: 'white', fontSize: '20px'}}/></Button>
                                  </div>
                            }

                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  </Col>
                )}
              </CardDeck>
            </Row>
          </TabPane>
        </TabContent>
         

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
)(Home);

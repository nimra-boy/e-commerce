import React, { Component } from 'react'
import PropTypes from 'prop-types'
import plus from '../../images/plus.png';
import minus from '../../images/minus.png';
import croix from '../../images/x.svg';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { faShippingFast } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import { Card, Button,  Modal, ModalHeader, ModalBody, ModalFooter,CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody, Container, Row, Col, Jumbotron, Input, Label, FormGroup,
    Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption, UncontrolledCarousel, Table} from 'reactstrap';

export class Cart extends Component {
    constructor(props) {
        super(props);

        this.userData = JSON.parse(localStorage.getItem('user'));

        this.state = {
          cart: [],
          number: [],
          error: false,
          delivery: '',
          userid: '',
          modal: false,
          key: '',
          chrismas: 0,
          total: '',
          totalStandard: '',
          totalExpress: '',
          index: 2,
          shipping: [],
          priceShipping1: '',
          priceShipping2: ''
        };
      }

      componentWillMount()
      {
        this.toggle = this.toggle.bind(this);
        var today = new Date();
        var mm = String(today.getMonth() + 1).padStart(2, '0');

        if(mm == '12'){
          this.setState({
            chrismas: 1,
          })
        }

          if(this.props.isAuthenticated){

              var user = localStorage.getItem('user');
              var userParsed = JSON.parse(user);
              var user_id = this.userData.id;

              this.setState({
                  userid: user_id,
              });

              axios.post('api/v1/cart/product', {user_id}).then(response =>{
                console.log(response.data)

                var tab = response.data;
                var array1 = [];
                var array2 = [];
                var array3 = [];

                tab.number.map(num => (
                  array2.push(parseInt(num.number))
                ));

                tab.cart.map(item => (
                  array1.push(parseInt(item.price, 10)),
                  (item.sale == 0 ? array3.push(1) : array3.push(1 - parseInt(item.discount, 10) / 100))
                ));

                array1 = array1.map(function (num, idx) {
                  return num * array3[idx];
                });

                var odd = 0;
                for(var i=0; i< array1.length; i++) {
                    odd += array1[i]*array2[i];
                };
                this.setState({
                    cart: tab.cart,
                    number: tab.number,
                    total: odd,
                    totalExpress: odd + tab.shipping[1].price,
                    totalStandard: odd + tab.shipping[0].price,
                    shipping: tab.shipping,
                    priceShipping1: tab.shipping[0].price,
                    priceShipping2: tab.shipping[1].price
                });
            }).catch(errors => {
                console.log(errors);
            })
        }
      else{

        var user_id = localStorage.getItem('unlog');


        console.log(typeof user_id)

        this.setState({
            userid: user_id
        });

        axios.post('api/v1/cart/product', {user_id}).then(response =>{
          var tab = response.data;
          var array1 = [];
          var array2 = [];
          var array3 = [];
          tab.number.map(num => (
            array2.push(parseInt(num.number))
          ));
          tab.cart.map(item => (
            array1.push(parseInt(item.price, 10)),
            (item.sale == 0 ? array3.push(1) : array3.push(1 - parseInt(item.discount, 10) / 100))
          ));

          array1 = array1.map(function (num, idx) {
            return num * array3[idx];
          });

          var odd = 0;
          for(var i=0; i< array1.length; i++) {
              odd += array1[i]*array2[i];
          };
          this.setState({
              cart: tab.cart,
              number: tab.number,
              total: odd,
              totalExpress: odd + tab.shipping[1].price,
              totalStandard: odd + tab.shipping[0].price,
              shipping: tab.shipping,
              priceShipping1: tab.shipping[0].price,
              priceShipping2: tab.shipping[1].price
          });
      }).catch(errors => {
          console.log(errors);
      })
          console.log('pas connecter pas de compte faut gerer ca')
      }
    }
    deleteCart = (e) => {

      if(this.props.isAuthenticated){
          var user = localStorage.getItem('user');
          var userParsed = JSON.parse(user);
          var user_id = userParsed['id'];

          const key = {
              userid: user_id,
              key: e.target.dataset,
          }

      axios.post('http://127.0.0.1:8000/api/v1/cart/delete', key).then(response =>{

        }).catch(errors => {
          console.log(errors);
        })
        document.location.reload(true);
      }
      else{

          var user = localStorage.getItem('unlog');

          const key = {
              userid: user,
              key: e.target.dataset,
          }

          axios.post('http://127.0.0.1:8000/api/v1/cart/delete', key).then(response =>{

          }).catch(errors => {
            console.log(errors);
          })
          document.location.reload(true);
      }
    }

    addCart = (e) => {

      if(this.props.isAuthenticated){
          var user = localStorage.getItem('user');
          var userParsed = JSON.parse(user);
          var user_id = userParsed['id'];

          const key = {
              user_id: user_id,
              product_id: e.target.dataset['key'],
          }
          axios.post('http://127.0.0.1:8000/api/v1/cart/add', key).then(response =>{

          }).catch(errors => {
              console.log(errors);
          })
          document.location.reload(true);

      }
      else{
          var user_id = localStorage.getItem('unlog');

          const key = {
              user_id: user_id,
              product_id: e.target.dataset['key'],
          }
          axios.post('http://127.0.0.1:8000/api/v1/cart/add', key).then(response =>{

          }).catch(errors => {
              console.log(errors);
          })
          document.location.reload(true);
          console.log("pas connecter frero tu peux pas add")
      }
      //   document.location.reload(true);

    }

    removeOne = (e) => {

      if(this.props.isAuthenticated){
          var user = localStorage.getItem('user');
          var userParsed = JSON.parse(user);
          var user_id = userParsed['id'];

          const key = {
              user_id: user_id,
              product_id: e.target.dataset['key'],
          }
          axios.post('http://127.0.0.1:8000/api/v1/cart/remove', key).then(response =>{

          }).catch(errors => {
              console.log(errors);
          })
          document.location.reload(true);

      }
      else{

          var user_id = localStorage.getItem('unlog');

          const key = {
              user_id: user_id,
              product_id: e.target.dataset['key'],
          }
          axios.post('http://127.0.0.1:8000/api/v1/cart/remove', key).then(response =>{

          }).catch(errors => {
              console.log(errors);
          })
          document.location.reload(true);
          console.log("pas connecter frero tu peux pas add")
      }
      //   document.location.reload(true);

    }

    checkOut = (e) => {

    if(this.state.index == 1){
      this.setState({
        delivery: 'standard'
      })
    }
    else{
      this.setState({
        delivery: 'express'
      })
    }
      this.props.history.push({
        pathname:"/guest",
        state:{
            key:e,
            delivery: this.state.index
         }
       });
      // if(this.props.isAuthenticated == true){

      //     var user = localStorage.getItem('user');
      //     var userParsed = JSON.parse(user);
      //     var user_id = userParsed['id'];

      //     const key = {
      //         user_id: user_id,
      //         total: this.state.total
      //     }

      //     axios.post('http://127.0.0.1:8000/api/v1/order/store', key).then(response =>{

      //     }).catch(errors => {
      //         console.log(errors);
      //     })

      //     document.location.reload(true);

      // }
      // else{
      //     var user_id = localStorage.getItem('user');

      //     const key = {
      //         user_id: user_id,
      //         total: this.state.total
      //     }

      //     axios.post('http://127.0.0.1:8000/api/v1/order/store', key).then(response =>{

      //     }).catch(errors => {
      //         console.log(errors);
      //     })

      //     document.location.reload(true);
      //     console.log("pas connecter frero tu peux pas add")
      // }


  }
  toggle() {

      this.setState(prevState => ({
        modal: !prevState.modal
      }));
    }

  register(){
      window.location = "http://127.0.0.1:8000/register";
  }

  guest(e){

      this.props.history.push({
          pathname:"/guest",
          state:{
              key:e,
              delivery: this.state.index
           }
         });
      console.log("param: "+e)
  }

    onSiteChanged = (e) => {
      if (e.target.dataset.key == 1)
      {
        this.setState({
          index: 1,
          // totalStandard: this.state.total + this.state.shipping[0].price,
          // total: this.state.total + this.state.shipping[0].price
        });
      }
      else
      {
        this.setState({
          index: 2,
          // totalExpress: this.state.total + this.state.shipping[1].price,
          // total: this.state.total + this.state.shipping[1].price

        });
      }
    }


    render() {
        const ok = this.state.number;
        const todos = Array.from(this.state.cart);
        var i = 0;

        return (
            <div>
              <Container className='mt-4'>
                <Row>
                  {/* <Col sm={3}>
                      <h1>Holaaaaaaa</h1>
                  </Col> */}
                  <Col>
                    <Table striped>
                      <tbody>
                          <tr style={{backgroundColor:'#F5FFFA', color: 'gray'}}>
                            <th className='text-center'>Image</th>
                            <th className='text-center'>Title</th>
                            <th className='text-center'>Quantity</th>
                            <th className='text-center'>Unit Price</th>
                            <th className='text-center'>Action</th>
                            <th className='text-center'>Id</th>
                          </tr>

                          {todos.map(todo =>
                          (
                            <tr key={todo.id}>

                              <td className='d-flex justify-content-center'>
                                <img style={{height: '200px', width: '200px' , border: 'solid 1px lightgrey'}} src={todo.filename}/>
                              </td>

                              <td className='text-center align-middle' style={{width: '30%'}}>
                                <h4>{todo.title}</h4>
                              </td>

                              <td className='text-center align-middle'>
                                <img onClick={this.removeOne} data-key={todo.product_id} src={minus} style={{width: '30px', backgroundColor: '#1E90FF', borderRadius: '20px', cursor: 'pointer', marginRight: '7px'}} />
                                {/* <FontAwesomeIcon onClick={this.removeOne} data-key={todo.product_id} style={{width: '30px', backgroundColor: '#1E90FF', borderRadius: '20px', cursor: 'pointer', marginRight: '7px', color: 'white'}} icon={faMinus} /> */}
                                <div style={{border: 'solid 1px grey', borderRadius: '3px', textAlign:'center', width:'30px', display: 'inline-block'}}>{ok[i].number}</div>
                                <img onClick={this.addCart} data-key={todo.product_id} src={plus} style={{width: '30px', backgroundColor: '#1E90FF', borderRadius: '20px', cursor: 'pointer', marginLeft: '7px'}} />
                                {/* <FontAwesomeIcon onClick={this.addCart} data-key={todo.product_id} style={{width: '30px', backgroundColor: '#1E90FF', borderRadius: '20px', cursor: 'pointer', marginLeft: '7px', color: 'white'}} icon={faPlus} /> */}
                              </td>

                              {(todo.sale == 0 ?
                              <td className='text-center align-middle'>
                                <h5>{todo.price} $</h5>
                              </td>
                              :
                              <td className='text-center align-middle'>
                                <h5>{todo.saleprice}$</h5>
                              </td> )}

                              <td className='text-center align-middle'>
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={this.deleteCart}
                                  data-key={todo.id}
                                >Delete</button>
                                {/* <FontAwesomeIcon onClick={this.deleteCart} data-key={todo.id} style={{fontSize: '25px', cursor: 'pointer', color: '#DC143C'}} icon={faTrashAlt}/> */}
                              </td>
                              <td className='text-center align-middle'>{i++}</td>
                            </tr>
                          ))
                          }
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </Container>
              <Container>
                <Row>
                  <Col className='d-flex justify-content-end'>
                    {(this.state.total < 50 ?
                      <div>
                        <legend>Choose your delivery method</legend>
                        <hr />
                        {this.state.shipping.map(data => (
                        <div className='text-center align-middle pl-4 pr-4' style={{color: 'grey', border: 'solid 2px grey', backgroundColor: '#F0FFFF', marginBottom: '5px', paddingTop:'10px'}}>
                          <div className='d-inline-block mr-5 pl-4'>
                            <Label check>
                              {(data.id == 1 ?
                                <FontAwesomeIcon style={{fontSize: '20px', marginRight: '25px'}} icon={faTruck}/>
                                :
                                <FontAwesomeIcon style={{fontSize: '20px', marginRight: '25px'}} icon={faShippingFast}/>
                              )}
                            <Input
                              type='radio'
                              name='shipping'
                              value={data.price}
                              data-key={data.id}
                              onChange={this.onSiteChanged}
                            />{data.type}</Label>
                          </div>
                          <div className='d-inline-block mr-5'>
                            <p><b>Price :</b> {data.price} $</p>
                          </div>
                          <div className='d-inline-block'>
                            <p><b>Duration :</b> {data.duration}</p>
                          </div>
                        </div>
                        ))}
                        <div>
                            <legend className='mt-4 mb-2'>Total of order</legend> <hr /> {(this.state.index == 2 ?
                              <div>
                                <h4>{this.state.totalExpress} $ </h4> <p><i>with <b>Express</b> shipping of <b>{this.state.priceShipping2} $</b></i><FontAwesomeIcon style={{fontSize: '20px', marginLeft: '15px'}} icon={faShippingFast}/></p>
                                <p>Delivery <b>OFFERED</b> for a price cart over 50$</p>
                              </div>
                            :
                              <div>
                                <h4>{this.state.totalStandard} $ </h4> <p><i>with <b>Standard</b> shipping of <b>{this.state.priceShipping1} $</b></i><FontAwesomeIcon style={{fontSize: '20px', marginLeft: '15px'}} icon={faTruck}/></p>
                                <p>Delivery <b>OFFERED</b> for a price cart over 50$</p>
                              </div>)}
                        </div>
                      </div>
                    :
                      <div style={{color: 'grey'}}>
                        <h4>Free Shipping</h4>
                        <hr/>
                        {this.state.chrismas == '1' &&
                        <h4>Christmas free special packaging<hr/></h4>
                        }
                        <h1>Total of order : {this.state.total} $</h1>
                      </div>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col className='d-flex justify-content-end'>
                  {(this.props.isAuthenticated ?
                    (this.state.total >= 50 ?
                      <Button color="info" onClick={() => this.guest(this.state.total)}>Check-out</Button>
                      :
                      (this.state.index == 2 ?
                        <Button color="info" onClick={() => this.guest(this.state.totalExpress)}>Check-out</Button>
                        :
                        <Button color="info" onClick={() => this.guest(this.state.totalStandard)}>Check-out</Button>
                        )
                      )

                    // <button type="button" className="btn btn-warning" onClick={() => this.checkOut(this.state.total)} >Checkout</button>
                    :
                    <div>
                            <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}Checkout</Button>
                            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                              <ModalHeader toggle={this.toggle}>Checkout method</ModalHeader>
                              <ModalBody>
                                  Would you like to sign in to get exclusive content every week or continue as a guest ?
                                  <br></br>
                                  <br></br>
                                  {(this.state.total >= 50 ?
                                    <h3>Total of : {this.state.total} $</h3>
                                    :
                                    (this.state.index == 2 ?
                                      <h3>{this.state.totalExpress} $</h3>
                                      :
                                      <h3>{this.state.totalStandard} $</h3>
                                    )
                                  )}
                              </ModalBody>

                              <ModalFooter>
                                  <Button color="primary" onClick={this.register}>Sign-in</Button>{' '}
                                  {(this.state.total >= 50 ?
                                    <Button color="secondary" onClick={() => this.guest(this.state.total)}>As guest</Button>
                                  :
                                    (this.state.index == 2 ?
                                      <Button color="secondary" onClick={() => this.guest(this.state.totalExpress)}>As guest</Button>
                                      :
                                      <Button color="secondary" onClick={() => this.guest(this.state.totalStandard)}>As guest</Button>
                                    )
                                  )}

                                  {/* <Button color="secondary" onClick={this.guest} value={this.state.total}>As guest</Button> */}
                              </ModalFooter>
                            </Modal>
                    </div>
                    )}
                  </Col>
                </Row>
              </Container>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user,
  });

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

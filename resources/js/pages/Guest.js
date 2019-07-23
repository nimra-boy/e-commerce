import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import ReeValidate from 'ree-validate';
import classNames from 'classnames';
import AuthService from '../services';
import CreditCardInput from 'react-credit-card-input';
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Alert,Toast, ToastBody, ToastHeader } from 'reactstrap';
import PaypalExpressBtn from 'react-paypal-express-checkout';

class Guest extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      total: this.props.history.location.state.key,
      delivery: this.props.history.location.state.delivery,
      errors: {},
      shipping: '',
      success: false,
      status: '',
      show: false,
      response: {
        error: false,
        message: '',
      },
    };

    this.hanldeToken = this.hanldeToken.bind(this);
    this.paypal = this.paypal.bind(this);

  }

  componentWillMount()
  {

    if(this.state.delivery == 1){
      this.setState({
        shipping: 'Standard'
      })
    }
    else{
      this.setState({
        shipping: 'Express'
      })
    }

  }

async hanldeToken(token, addresses){

  console.log(token);

    // console.log(this.props.history.location.state.key);
    // console.log(this.state.ok)
    console.log(token.card.address_country)
    // console.log("token: " + token.id)
    // console.log("address: " + token.card.address_line1)


    if(this.props.isAuthenticated){

      var user = localStorage.getItem('user');
      var userParsed = JSON.parse(user);
      var user_id = userParsed['id'];

    const key = {
        user_id: user_id,
        name: token.card.name,
        email:token.email,
        country: token.card.address_country,
        city: token.card.address_city,
        adress: token.card.address_line1,
        zip:token.card.address_zip,
        token: token.id,
        total: this.state.total,
        delivery: this.state.shipping
    }

      const response = await axios.post('api/v1/order/store', key).then(response =>{
        console.log(response.status)

        this.setState({
          status: response.status
        })
        console.log(response)
      }).catch(errors => {
          console.log(errors);
      })
      // console.log(response)
      if (this.state.status == 200){
        console.log('statuuuus 200')
        this.setState({
          show: true,
        })
        toast('Success! Check your orders for details',
        {type: 'success'})
      } else{
        console.log('statuuuus wrong')

        toast('Something went wrong',
        {type: 'error'})
      }

  }
  else{

      var user_id = localStorage.getItem('unlog');

      console.log(user_id)

      const key = {
        user_id: user_id,
        name: token.card.name,
        email:token.email,
        country: token.card.address_country,
        city: token.card.address_city,
        adress: token.card.address_line1,
        zip:token.card.address_zip,
        token: token.id,
        total: this.state.total,
        delivery: this.state.shipping

    }
    const response = await axios.post('api/v1/order/store', key).then(response =>{
      console.log(response.status)

      this.setState({
        status: response.status
      })
    }).catch(errors => {
        console.log(errors);
    })

    if(this.state.status == 200){
      console.log('statuuuus 200')
      this.setState({
        show: true,
      })
      toast('Success! Check your orders for details',
      {type: 'success'})
    } else{
      console.log('statuuuus wrong')

      toast('Something went wrong',
      {type: 'error'})
    }

  }
}

async paypal(payment){
  console.log(payment)
  console.log(payment.address.recipient_name)
  console.log(payment.address.line1)
  console.log(payment.address.city)
  console.log(payment.address.postal_code)
  console.log(payment.address.country_code)

  if(this.props.isAuthenticated){
     
  var user = localStorage.getItem('user');
  var userParsed = JSON.parse(user);
  var user_id = userParsed['id'];

    const key = {
      user_id: user_id,
      name: payment.address.recipient_name,
      country: payment.address.country_code,
      city: payment.address.city,
      adress: payment.address.line1,
      zip:payment.address.postal_code,
      paymentID: payment.payerID,
      payerID: payment.paymentID,
      total: this.state.total,
      delivery: this.state.shipping
    }

    const response = await axios.post('api/v1/order/storepaypal', key).then(response =>{
      console.log(response.status)

      this.setState({
        status: response.status
      })
    }).catch(errors => {
        console.log(errors);
    })

    if(this.state.status == 200){
      console.log('statuuuus 200')
      this.setState({
        show: true,
      })
      toast('Success! Check your orders for details',
      {type: 'success'})
    } else{
      console.log('statuuuus wrong')

      toast('Something went wrong',
      {type: 'error'})
    }

  } else {

    var user_id = localStorage.getItem('unlog');
    const key = {
      user_id: user_id,
      name: payment.address.recipient_name,
      country: payment.address.country_code,
      city: payment.address.city,
      adress: payment.address.line1,
      zip:payment.address.postal_code,
      paymentID: payment.payerID,
      payerID: payment.paymentID,
      total: this.state.total,
      delivery: this.state.shipping
    }
    const response = await axios.post('api/v1/order/storepaypal', key).then(response =>{
      console.log(response.status)

      this.setState({
        status: response.status
      })
    }).catch(errors => {
        console.log(errors);
    })

    if(this.state.status == 200){
      console.log('statuuuus 200')
      this.setState({
        show: true,
      })
      toast('Success! Check your orders for details',
      {type: 'success'})
    } else{
      console.log('statuuuus wrong')

      toast('Something went wrong',
      {type: 'error'})
    }

  }

}


  render() {
    // If user is already authenticated we redirect to dashboard.
    // if (this.props.isAuthenticated) {
    //   return <Redirect to="/" replace />;
    // }
    var total = this.state.total
    // console.log(total)
    const { response, errors, loading } = this.state;
    
    const client = {
      sandbox:    'AUS7pP2z0JQ6vJVwnRcxS8mSkqINMeBa1x6bII3PmgWYi4aQBBScev5Q-O5qmFPQ9QKnc2ivOPcdn4P4',
      production: 'ELMSFEe67Yhvhr0eNvIkr4J0sU-VUe0-Y5smbYXbljOTqfqN4Wabuf_eWAOnEM4K_Au9nSYHDcr9c1Er',
  }

    return (
      <div>
        <div className="d-flex flex-column flex-row align-content-center py-5">
          <div className="container">
            <div className="row">
              <div className="section-login col-lg-6 ml-auto mr-auto">

                    <h4>Checkout page</h4>

                <div className="card-login card mb-3">
                  <div className="card-body">

                    
                    <h4>Credit card information</h4>
                    {this.state.status == 200 &&
                    //   <MySnackbarContentWrapper
                    //   variant="success"
                    //   className={classes.margin}
                    //   message="This is a success message!"
                    //   />
                      <Alert color="success">
                         Your payment was successful!
                         Check your orders
                      </Alert>
                        
                      }
                      
                      {this.state.status == 500 &&
                        <Alert color="danger">
                        Somehting went wrong!
                      </Alert>
                      }

 
                        <div className="card-login card mb-3">

                            {/* <CreditCardInput
                              cardNumberInputProps={{ onChange: this.handleCardNumberChange }}
                              cardExpiryInputProps={{ onChange: this.handleCardExpiryChange }}
                              cardCVCInputProps={{ onChange: this.handleCardCVCChange }}
                              fieldClassName="input"
                            /> */}
                            {this.state.status == 200

                            }

                            <StripeCheckout
                              stripeKey="pk_test_61OSXziHd1CwB2FxIi4MUBgo00Zsa3hi14"
                              style={{display: this.state.show ? 'none' : 'block'}}  
                              token={this.hanldeToken}
                              billingAddress
                              shippingAddress
                              amount={total* 100}
                              bitcoin
                              alipay
                              paypal
                              name="ASJAY House Automation" // the pop-in header title
                              description="Automation Stuff" // the pop-in header subtitle
                              image="https://media.discordapp.net/attachments/588040834201419855/592741796874813440/bluebird.png?width=250&height=300" 
                              />

                                                          
                            </div> 
                            <div style={{display: this.state.show ? 'none' : 'block' }}>
                            <p style={{textAlign: 'center'}}>or</p>

                            <PaypalExpressBtn  style={{display: 'none'}} client={client} onSuccess={this.paypal} currency={'USD'} total={total} />

                            </div>
           
                        <div className="form-group text-center">
                          {total } $

                      </div>                
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>

    );
  }
}

// Guest.propTypes = {
//   dispatch: PropTypes.func.isRequired,
//   isAuthenticated: PropTypes.bool.isRequired,
// };

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
});

export default connect(mapStateToProps)(Guest);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Http from '../Http';
import axios from 'axios';
import { Table } from 'reactstrap';
import moment from 'moment/moment.js'

class MyOrder extends Component {
  constructor(props) {
    super(props);
    if(this.props.isAuthenticated){
      var admin = localStorage.getItem('user');
      var a = JSON.parse(admin)
      this.state = {
        loading: true,
        role: a['role'],
        data: {},
        apiMore: '',
        date_e: '',
        date_s: '',
        moreLoaded: false,
        error: false,
        providers: [],
      };
    }
    else{
      this.state = {
        loading: true,
        data: {},
        apiMore: '',
        moreLoaded: false,
        error: false,
      };
    }
    // API Endpoint
    this.api = '/api/v1/product';
  }

  componentWillMount()
  {

      var in5Days = moment().add("days",5);
      var standard = in5Days.format("dddd, MMMM Do YYYY");
  
  
      this.setState({
        date_s: standard
      })
      var in2Days = moment().add("days",2);
      var express = in2Days.format("dddd, MMMM Do YYYY");

      this.setState({
        date_e: express
      })

 
      if(this.props.isAuthenticated)
      {            
          console.log("ifffff")

            var user = localStorage.getItem('user');
            var userParsed = JSON.parse(user);
            var user_id = userParsed['id'];
            console.log(user_id)

            axios.post('api/v1/order/myorder', {user_id}).then(response =>{
                console.log("okokok: " + response)
                

                    this.setState({
                        data:response.data
                    });

                }).catch(errors => {
                    console.log(errors);
                })
      }
      else{
        console.log("elsessssss")

        var user_id = localStorage.getItem('unlog');

        console.log(user_id)

        axios.post('api/v1/order/myorder', {user_id}).then(response =>{
            console.log("okokok: " + response)

            this.setState({
                data:response.data
            });

        }).catch(errors => {
            console.log(errors);
        })
    }


  }




  render() {
    const { loading, error, apiMore } = this.state;
    const todos = Array.from(this.state.data);

      return (
        <div className="container py-5">
          <h1 className="text-center mb-4" style={{color: '#00979d'}}>Orders</h1>

          {error &&
            <div className="text-center">
              <p>{error}</p>
            </div>
          }

          <Table striped bordered>
            <tbody>
              <tr>
                <th className='text-center'>Date</th>
                <th className='text-center'>Price</th>

                <th className='text-center'>Adress</th>

                <th className='text-center'>Shipping</th>

                <th className='text-center'>State</th>

              </tr>
              {todos.map(todo =>
                (
                  <tr key={todo.id}>
                      
                     <td className='text-center'>{todo.created_at}</td>
                     <td className='text-center'>{todo.price} $</td>

                    <td className='text-center'>{todo.adress} {todo.city} {todo.zip}</td>
                    
                    <td className='text-center'>{todo.delivery}</td>

                    {todo.delivery == 'Express' && 
                    <td className='text-center'>{this.state.date_e}</td>

                    }
                    {todo.delivery == 'Standard' && 
                    <td className='text-center'>{this.state.date_s}</td>

                    }
                  </tr>
                ))
              }
            </tbody>

          </Table>
        </div>
      );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
});

export default connect(mapStateToProps)(MyOrder);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Http from '../Http';
import axios from 'axios';
import { Table } from 'reactstrap';
import moment from 'moment/moment.js'

class Dashboard extends Component {
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
        date_s:'',
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
      axios.get('api/v1/order/get').then(response =>{
          this.setState({
              data:response.data
          });
      }).catch(errors => {
          console.log(errors);
      })
      axios.get('api/v1/order/providers').then(response =>{
        this.setState({
            providers:response.data
        });
    }).catch(errors => {
        console.log(errors);
    })
  }


  deleteProvider = (e) => {

        var key =  e.target.dataset.key

        axios.post('http://127.0.0.1:8000/api/v1/order/deleteproviders', {key}).then(response =>{

        }).catch(errors => {
            console.log(errors);
        })
        document.location.reload(true);
  }

  editTodo = (e) => {
    const { key } = e.target.dataset;
    const { data: todos } = this.state;

    axios.post('http://127.0.0.1:8000/api/v1/product/', {key}).then(response =>{
      this.setState({
          results:response.data
      });
      }).catch(errors => {
        console.log(errors);
      })
  }

  render() {
    const { loading, error, apiMore } = this.state;
    const todos = Array.from(this.state.data);
    const providers = Array.from(this.state.providers);

    if(this.props.isAuthenticated && this.state.role == 'admin'){
      return (
        <div className="container py-5">
          <h1 className="text-center mb-4" style={{color: '#00979d'}}>Orders</h1>

          {error &&
            <div className="text-center">
              <p>{error}</p>
            </div>
          }

          {/* <a href='/create'><button className='btn btn-success mb-3'>Create new product</button></a> */}

          <Table striped bordered>
            <tbody>
              <tr>
                <th className='text-center'>Customer id</th>
                <th className='text-center'>Order date</th>

                <th className='text-center'>Name</th>
                <th className='text-center'>Adress</th>

                <th className='text-center'>Price</th>
                <th className='text-center'>Shipping</th>
                <th className='text-center'>State</th>

              </tr>
              {todos.map(todo =>
                (
                  <tr key={todo.id}>
                    <td className='text-center'>{todo.user_id}</td>
                    <td className='text-center'>{todo.created_at}</td>

                    <td className='text-center'>{todo.name}</td>
                    <td className='text-center'>{todo.adress} {todo.city} {todo.zip}</td>

                    <td className='text-center'>{todo.price} $</td>
                    <td className='text-center'>{todo.delivery} </td>
                    {todo.delivery == 'Express' && 
                    <td className='text-center'>{this.state.date_e}</td>

                    }
                    {todo.delivery == 'Standard' && 
                    <td className='text-center'>{this.state.date_s}</td>

                    }

                    {/* <td className='text-center'>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={this.deleteTodo}
                        data-key={todo.id}
                      >
                        Delete
                      </button>

                      <a href={"update/?produit=" + todo.id}><button className='btn btn-light'>Update</button></a>

                    </td> */}
                  </tr>
                ))
              }
            </tbody>

          </Table>

            <hr></hr>
              <div className="container py-5">
                <h1 className="text-center mb-4" style={{color: '#00979d'}}>Providers</h1>

                {error &&
                    <div className="text-center">
                    <p>{error}</p>
                    </div>
                }

                <a href='/createprovider'><button className='btn btn-success mb-3'>Create new provider</button></a>

                <Table striped bordered>
                    <tbody>
                    <tr>
                        <th className='text-center'>Name</th>

                        <th className='text-center'>Price</th>
                        <th className='text-center'>Duration</th>
                        <th className='text-center'>Action</th>

                    </tr>
                    {providers.map(provider =>
                        (
                        <tr key={provider.id}>
                            <td className='text-center'>{provider.name}</td>
                            <td className='text-center'>{provider.price} $</td>
                            <td className='text-center'>{provider.duration}</td>

                            <td className='text-center'>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={this.deleteProvider}
                                data-key={provider.id}
                            >
                                Delete
                            </button>
                            <a href="#" className='btn btn-warning'>Command</a>
                            </td>
                        </tr>
                        ))
                    }
                    </tbody>
                </Table>

                </div>
        </div>
      );
    }else{
      return (
        <div className="container py-5">
          <h1 className="text-center mb-4" style={{color: '#00979d'}}>Access forbidden</h1>

          <a href='/home'><button className='btn btn-success mb-3'>Return to home page</button></a>
        </div>
      );
    }


  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
});

export default connect(mapStateToProps)(Dashboard);

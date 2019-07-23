import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Http from '../Http';
import axios from 'axios';
import { Table, Form, FormGroup, Input, Button } from 'reactstrap';

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
        moreLoaded: false,
        error: false,
        shipping: []
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

      axios.get('api/v1/category/all').then(response =>{
          this.setState({
              data:response.data.products,
              shipping:response.data.shipping
          });
      }).catch(errors => {
          console.log(errors);
      })
      
  }

  loadMore = () => {
    this.setState({ loading: true });
    Http.get(this.state.apiMore)
      .then((response) => {
        const { data } = response.data;
        const apiMore = response.data.links.next;
        const dataMore = this.state.data.concat(data);
        this.setState({
          data: dataMore, apiMore, loading: false, moreLoaded: true, error: false,
        });
      })
      .catch(() => {
        this.setState({
          error: 'Unable to fetch data.',
        });
      });
  }

  deleteTodo = (e) => {
    const { key } = e.target.dataset;
    const { data: todos } = this.state;

    Http.delete(`${this.api}/${key}`)
      .then((response) => {
        if (response.status === 200) {
          const index = todos.findIndex(todo => parseInt(todo.id, 10) === parseInt(key, 10));
          const update = [...todos.slice(0, index), ...todos.slice(index + 1)];
          this.setState({ data: update });
        }
      })
      .catch((error) => {
        console.log(error);
      });
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

  handleSubmit(event)
  {
    event.preventDefault();

    var shippingId = parseInt(event.target[0].id, 10);
    var shippingPrice = parseInt(event.target[0].value, 10);
    let uri = 'http://127.0.0.1:8000/api/v1/shipping/update/'+shippingId;
    axios.put(uri, {shippingPrice}).then((response) => {

    });
    window.location.reload();
  }

  handleSubmit2(event)
  {
    event.preventDefault();

    var id = parseInt(event.target[0].id, 10);
    var sale = parseInt(event.target[0].value, 10);
    var discount = parseInt(event.target[1].value, 10);

    // console.log(id, sale);
    let uri = 'api/v1/sale/update/'+id;
    axios.put(uri, {sale, discount}).then((response) => {

    });
    window.location.reload();
  }

  render() {
    const { loading, error, apiMore } = this.state;
    const todos = Array.from(this.state.data);

    if(this.props.isAuthenticated && this.state.role == 'admin'){
      return (
        <div className="container py-5">
          <h1 className="text-center mb-4" style={{color: '#00979d'}}>Admin Products Dashboard</h1>

          {error &&
            <div className="text-center">
              <p>{error}</p>
            </div>
          }

          <a href='/create'><button className='btn btn-success mb-3'>Create new product</button></a>
          <Table striped bordered>
            <tbody>
              <tr>
                <th>Tilte</th>
                <th className='text-center'>Stock</th>
                <th className='text-center'>Price</th>
                <th className='text-center'>Action</th>
                <th className='text-center'>Missing products</th>
                <th className='text-center'>Sale/Discount</th>
              </tr>
              {todos.map(todo =>
                (
                  <tr key={todo.id}>
                    <td>{todo.title}</td>
                    <td className='text-center'>{todo.stock}</td>
                    <td className='text-center'>
                      {todo.sale == 0 &&
                        todo.price + '$'
                      }
                      {todo.sale == 1 &&
                        todo.saleprice + '$'
                      }
                    </td>
                    <td className='text-center'>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={this.deleteTodo}
                        data-key={todo.id}
                      >
                        Delete
                      </button>

                      <a href={"update/?produit=" + todo.id}><button className='btn btn-light'>Update</button></a>
                    </td>
                    <td className='text-center'>
                    {todo.stock < 10 &&
                        <a href="/orders" className='btn btn-warning'>Command</a>
                      }
                    </td>
                    <td className='text-center'>
                        <Form onSubmit={this.handleSubmit2}>
                          {(todo.sale == 0 ?
                          <FormGroup>
                            <Input type='select' name='select' id={todo.id}>
                              <option value={todo.sale}>Not Sold</option>
                              <option value='1'>Sold</option>
                            </Input>
                          </FormGroup> :
                          <FormGroup>
                            <Input type='select' name='select' id={todo.id}>
                              <option value={todo.sale}>Sold</option>
                              <option value='0'>Not Sold</option>
                            </Input>
                          </FormGroup>)}
                          <FormGroup>
                            <Input type='number' placeholder={todo.discount} min='1' max='100' />
                          </FormGroup>
                          <Button type='submit' color='light'>Edit</Button>
                        </Form>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>

          {apiMore &&
          <div className="text-center">
            <button
              className={classNames('btn btn-primary', {
                'btn-loading': loading,
              })}
              onClick={this.loadMore}
            >
            Load More
            </button>
          </div>
          }

          {(apiMore === null) && (this.state.moreLoaded === true) &&
            <div className="text-center">
              <p>Everything loaded.</p>
            </div>
          }

          <hr/>
          <h1 className="text-center mb-4" style={{color: '#00979d'}}>Shippings methods</h1>

          <Table striped bordered>
            <tbody>
              <tr>
                <th className='text-center'>Type</th>
                <th className='text-center'>Price</th>
                <th className='text-center'>Duration</th>
                <th className='text-center'>Change price</th>
              </tr>
              {this.state.shipping.map(data =>
                (
                  <tr key={data.id}>
                    <td className='text-center'>{data.type}</td>
                    <td className='text-center'>{data.price} $</td>
                    <td className='text-center'>{data.duration}</td>
                    <td className='text-center'>
                      <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                          <Input type='number' name='price' id={data.id} min="1" max='80' placeholder={data.price} required/>
                        </FormGroup>
                        <FormGroup>
                          <Button type='submit'>Update</Button>
                        </FormGroup>
                      </Form>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
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

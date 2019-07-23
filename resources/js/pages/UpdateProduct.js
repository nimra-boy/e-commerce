import React, {Component} from 'react';
import axios from 'axios';
import MyGlobleSetting from './MyGlobleSetting';
import { Container, Col, Button, Form, FormGroup, Label, Input, Card, CardHeader, CardBody, FormFeedback } from 'reactstrap';

class UpdateProduct extends Component {
  constructor(props) {
      super(props);

      this.state = {stock: '',
      price: '',
      category:'',
      id:this.props.location.search.substr(9),
    };
      this.handleChange1 = this.handleChange1.bind(this);
      this.handleChange2 = this.handleChange2.bind(this);
      this.handleChange3 = this.handleChange3.bind(this);

      this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    axios.get(MyGlobleSetting.url + `/api/product/${this.state.id}/`)
    .then(response => {
      this.setState({ stock: response.data.stock, price: response.data.price, category: response.data.category });
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  handleChange1(e){
    this.setState({
      stock: e.target.value
    })
  }
  handleChange2(e){
    this.setState({
      price: e.target.value
    })
  }
  handleChange3(e){
    this.setState({
      category: e.target.value
    })
  }


  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  handleSubmit(event) {
        event.preventDefault();
        const products = {
        stock: this.state.stock,
        price: this.state.price,
        category: this.state.category
        }

        let uri = 'http://127.0.0.1:8000/api/v1/product/'+this.state.id;
        axios.patch(uri, products).then((response) => {

            });
        this.props.history.push('/dashboard');
    }

  render(){

    if(this.state.id == ''){
      return (
        <div className="container py-5">
          <h1 className="text-center mb-4" style={{color: '#00979d'}}>Access forbidden</h1>
  
          <a href='/home'><button className='btn btn-success mb-3'>Return to home page</button></a>
        </div>
      );
    }
    else{
      return (
        <Container>
        <Card className='mt-5 mb-3'>
          <CardHeader className='text-center'>Edit Product</CardHeader>
          <CardBody>
            <Form onSubmit={this.handleSubmit}>
            <FormGroup row>
              <Label for="price" sm={2}>Product Price</Label>
              <Col sm={10}>
                <Input type="number" name="price" id="price" value={this.state.price} onChange={this.handleChange2} required/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="category" sm={2}>Category</Label>
              <Col sm={10}>
                <Input type="select" name="category" id="category" onChange={this.handleChange3} value={this.state.category} required>
                  <option value="#">Choose a category</option>
                  <option value="all">All</option>
                  <option value="professional">Professional</option>
                  <option value="private">Private</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="stock" sm={2}>Product Stock</Label>
              <Col sm={10}>
                <Input type="number" name="stock" id="stock" onChange={this.handleChange1} value={this.state.stock} required/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button type='submit'className='btn-success'>Update</Button>
              </Col>
            </FormGroup>
          </Form>
          </CardBody>
        </Card>
      </Container>
      )
    }
  }
}
export default UpdateProduct;

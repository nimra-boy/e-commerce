import React, {Component} from 'react';
import axios from "axios";
import { Container, Col, Button, Form, FormGroup, Label, Input, Card, CardHeader, CardBody, FormFeedback } from 'reactstrap';


class CreateProduct extends Component {
  constructor(props){
    super(props);
    this.state = {providerName: '', providerPrice: '',providerDuration: ''};


    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);


    this.handleSubmit = this.handleSubmit.bind(this);


  }

  handleChange1(e){
    this.setState({
      providerName: e.target.value
    })
  }
  handleChange2(e){
    this.setState({
      providerPrice: e.target.value
    })
  }
  handleChange3(e){
    this.setState({
      providerDuration: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault();
    const provider = {
      name: this.state.providerName,
      price: this.state.providerPrice,
      duration: this.state.providerDuration,
    }
    console.log("okokdwoakdpawkdpwakopdokaw "+provider);
    let uri = 'http://127.0.0.1:8000/api/v1/order/addprovider';
    axios.post(uri, provider).then((response) => {

    });
    this.props.history.push('/orders');

  }


    render() {
      return (
        <Container>
          <Card className='mt-5 mb-3'>
            <CardHeader className='text-center'>Add a new Provider</CardHeader>
            <CardBody>
              <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Label for="title" sm={2}>Provider name</Label>
                <Col sm={10}>
                  <Input type="text" name="title" id="title" onChange={this.handleChange1} placeholder="The name of the Provider" required/>
                  <FormFeedback valid>Sweet! that name is available</FormFeedback>
                </Col>
              </FormGroup>
  
              <FormGroup row>
                <Label for="price" sm={2}>Provider Price</Label>
                <Col sm={10}>
                  <Input type="number" name="price" id="price" onChange={this.handleChange2} placeholder="The price" required/>
                </Col>
              </FormGroup>

 


              <FormGroup row>
                <Label for="duration" sm={2}>Duration</Label>
                <Col sm={10}>
                  <Input type="text" name="duration" id="duration" onChange={this.handleChange3} placeholder='Add here the duration' required/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={{ size: 10, offset: 2 }}>
                  <Button type='submit'className='btn-success'>Send</Button>
                </Col>
              </FormGroup>
            </Form>
            </CardBody>
          </Card>
        </Container>
      )
    }
}
export default CreateProduct;

import React, {Component} from 'react';
import axios from "axios";
import { Container, Col, Button, Form, FormGroup, Label, Input, Card, CardHeader, CardBody, FormFeedback } from 'reactstrap';
import ImageUploader from 'react-images-upload';
import FileUploadComponent from './FileUploadComponent';


class CreateProduct extends Component {
  constructor(props){
    super(props);
    this.state = {
     productTitle: '',
     productDescription: '',
     productPrice: '', 
     productCategory: '', 
     productStock: '', 
     productImage: '',
     pictures: [] ,
     image: ''
    };

    this.onDrop = this.onDrop.bind(this);

    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange4 = this.handleChange4.bind(this);
    this.handleChange5 = this.handleChange5.bind(this);
    this.handleChange6 = this.handleChange6.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);


  }

  // componentDidMount(){
  //   var htmlInput = document.getElementById("title");
  //   htmlInput.oninvalid = function(e) {
  //       e.target.setCustomValidity("This can't be left blank!");
  //   };
  // }

  handleChange1(e){
    this.setState({
      productTitle: e.target.value
    })
  }
  handleChange2(e){
    this.setState({
      productDescription: e.target.value
    })
  }
  handleChange3(e){
    this.setState({
      productPrice: e.target.value
    })
  }
  handleChange4(e){
    this.setState({
      productCategory: e.target.value
    })
  }
  handleChange5(e){
    this.setState({
      productStock: e.target.value
    })
  }
  handleChange6(e){

    this.setState({
      productImage: e.target.value
    })

    let files = e.target.files || e.dataTransfer.files;
    if (!files.length)
          return;
    this.createImage(files[0]);



  }

  createImage(file) {
    let reader = new FileReader();
    reader.onload = (e) => {
      this.setState({
        image: e.target.result
      })
    };
    reader.readAsDataURL(file);
  }

  handleSubmit(e){
    e.preventDefault();
    const products = {
      title: this.state.productTitle,
      description: this.state.productDescription,
      price: this.state.productPrice,
      category: this.state.productCategory,
      stock: this.state.productStock,
      image: this.state.image
    }

    console.log(products)
    let uri = 'http://127.0.0.1:8000/api/v1/product';
    axios.post(uri, products).then((response) => {

    });
    this.props.history.push('/dashboard');

  }

  onDrop(pictureFiles, pictureDataURLs) {
		this.setState({
            pictures: this.state.pictures.concat(pictureFiles),
        });
	

    console.log( pictureFiles)

    console.log( this.state.pictures)
}


    render() {
      return (
        <Container>
          <Card className='mt-5 mb-3'>
            <CardHeader className='text-center'>Add a new Product</CardHeader>
            <CardBody>
              <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Label for="title" sm={2}>Product Title</Label>
                <Col sm={10}>
                  <Input type="text" name="title" id="title" onChange={this.handleChange1} placeholder="The title of the product" required/>
                  <FormFeedback valid>Sweet! that name is available</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="description" sm={2}>Product Description</Label>
                <Col sm={10}>
                  <Input type="textarea" name="description" id="description" onChange={this.handleChange2} placeholder="The description of the product" required/>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="price" sm={2}>Product Price</Label>
                <Col sm={10}>
                  <Input type="number" name="price" id="price" onChange={this.handleChange3} placeholder="The price" required/>
                </Col>
              </FormGroup>
              
              <FormGroup row>
                <Label for="category" sm={2}>Category</Label>
                <Col sm={10}>
                  <Input type="select" name="category" id="category" onChange={this.handleChange4} required>
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
                  <Input type="number" name="stock" id="stock" onChange={this.handleChange5} placeholder="The number of available stock" required/>
                </Col>
              </FormGroup>


{/* 
              <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            /> */}

              <FormGroup row>
                <Label for="image" sm={2}>Image</Label>
                <Col sm={10}>
                  <Input type="file" name="image" id="image" onChange={this.handleChange6} placeholder='Add here the address of the image' required/>
                  <FormFeedback invalid>Sweet! that name is available</FormFeedback>
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

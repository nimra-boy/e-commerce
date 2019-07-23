import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {Link} from "react-router-dom";
import { Card, Button, CardImg, CardTitle, CardText, CardDeck,
  CardSubtitle, CardBody, Container, Row, Col } from 'reactstrap';


class SearchResults extends Component {
  constructor(props){
      super(props);

    // Initial state.
      this.state = {
          results: [],
          search: '',
      };
  }

  componentWillMount(){
    var odd = this.props.location.search.substr(8);
      axios.post('http://127.0.0.1:8000/api/v1/product/search', {odd}).then(response =>{
          this.setState({
              results:response.data
          });
      }).catch(errors => {
          console.log(errors);
      })
  }

  render() {
    return (
      <Container>
        <div className="d-flex justify-content-center mt-4 mb-4">
          <h1>Results Products</h1>
        </div>
        <Row>
          <CardDeck>
            {this.state.results.map(product =>
              <Col md='4' className='mb-4'>
                <div key={product.id}>
                  <Card body outline color="info">
                    <CardImg top width="100%" src={product.filename} alt="Arduino"/>
                    <CardBody key={product.id}>
                      <CardTitle className='d-flex justify-content-center'><h4>{product.title}</h4></CardTitle>
                      <CardSubtitle className='d-flex justify-content-end'>{product.price} $</CardSubtitle>
                      <hr className="my-2"/>
                      <CardText>{((product.description).length > 150) ? (((product.description).substring(0, 147)) + '...') : product.description}</CardText>
                      <hr className="my-2"/>
                      <small className="text-muted">Last updated {product.updated_at}</small>
                      <Link to={'/product/' + product.id}><Button className='btn-info mt-3'>See More</Button></Link>
                    </CardBody>
                  </Card>
                </div>
              </Col>
            )}
          </CardDeck>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
)(SearchResults);

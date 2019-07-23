import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import fb from '../../images/facebook.svg';
import insta from '../../images/instagram.svg';
import linkedin from '../../images/linkedin.svg';
import twitter from '../../images/twitter.svg';

class Footer extends Component {
  render() {

    return (
      <MDBFooter style={{ backgroundColor: '#00979d', color: 'white'}} className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center">
        <MDBRow>
          <MDBCol md="4">
            <h5 className="title">About Us</h5>
            <h6>
              ASJAY make your life easier every day !
            </h6>
          </MDBCol>
          <MDBCol md="4">
            <h5 className="title">Follow Us</h5>
            <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/ASJAY-1146421028878961/?modal=admin_todo_tour"><button className='btn rsx fb'><img style={{filter: 'invert(100%)'}} src={fb} alt="Facebook"/></button></a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/asjay_asjay/"><button className='btn rsx insta'><img style={{filter: 'invert(100%)'}} src={insta} alt="Instagram"/></button></a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/asjay/"><button className='btn rsx linkedin'><img style={{filter: 'invert(100%)'}} src={linkedin} alt="LinkedIn"/></button></a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.pinterest.fr/asjaycompany/"><button className='btn rsx twitter'><img style={{filter: 'invert(100%)'}} src={twitter} alt="Twitter"/></button></a>
          </MDBCol>
          <MDBCol md="4">
            <h5 className="title">Category</h5>
            <ul className='footerCat'>
              <li className="list-unstyled mt-3">
                <a href="/rtu">Ready to use</a>
              </li>
              <li className="list-unstyled">
                <a href="/components">Components</a>
              </li>
              <li className="list-unstyled">
                <a href="/all">All</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <span style={{fontFamily: 'adam', fontWeight: 'bold', letterSpacing: '3px'}}>ASJAY</span>
        </MDBContainer>
      </div>
    </MDBFooter>
    );
  }
}


function mapStateToProps(state) {
  return {

  };
}

export default connect(
  mapStateToProps,
)(Footer);

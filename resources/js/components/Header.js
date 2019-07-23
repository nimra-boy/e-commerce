import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../sass/style.css';
import logout from '../../images/log-out.svg';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faSignInAlt, faSignOutAlt, faCartArrowDown, faSitemap, faUserCircle } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import {
    Nav,
    Navbar,
    NavItem,
    NavbarToggler,
    Form,
    FormGroup,
    Input,
    Button,
    NavLink,
    Collapse,
    UncontrolledDropdown,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container,
    Row,
    Col,
    Badge
} from 'reactstrap';
import * as actions from '../store/actions';

class Header extends Component {
    constructor(props)
    {
      // getStocks().then(function(data){
      //   console.log(data);
      // });
        super(props);

        // this.toggle = this.toggle.bind(this);
        // this.toggleUser = this.toggleUser.bind(this);
        this.userData = JSON.parse(localStorage.getItem('user'));
        if(this.props.isAuthenticated){
          var admin = localStorage.getItem('user');
          var a = JSON.parse(admin)
          this.state = {
            role: a['role'],
            isOpen: false,
            value: '',
            user: '',
            countCart: '',
            dropdownOpen: false,
          };
        }
        else{
          this.toggle = this.toggle.bind(this);
          this.state = {
            role: 'customer',
            isOpen: false,
            value: '',
            user: '',
            dropdownOpen: false,
          };
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
        console.log("celui qui marche pas ..."+this.state.isOpen);
    }

    toggleUser = () => {
      this.setState({
          dropdownOpen: !this.state.dropdownOpen
      })

      console.log("marche bien ..."+this.state.dropdownOpen);
    }

    componentDidMount()
    {
      if(this.props.isAuthenticated){

        var user_id = this.userData.id;

        this.setState({
          user: this.userData
        });

        axios.post('api/v1/cart/product', {user_id}).then(response =>{
            var tab = [];
            response.data.number.map(num => (
              tab.push(parseInt(num.number))
            ));
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            this.setState({
              countCart: tab.reduce(reducer)
            })
            console.log(this.state.countCart);
        }).catch(errors => {
            console.log(errors);
        });
      }
      else{
        var user_id = localStorage.getItem('unlog');

        axios.post('api/v1/cart/product', {user_id}).then(response =>{
            var tab = [];
            response.data.number.map(num => (
              tab.push(parseInt(num.number))
            ));
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            this.setState({
              countCart: tab.reduce(reducer)
            })
            console.log(this.state.countCart);
        }).catch(errors => {
            console.log(errors);
        });
      }
    }

    handleLogout = (e) => {
        e.preventDefault();
        this.props.dispatch(actions.authLogout());
    }

    capitalize = function(str1){
      if(str1 != null){
        return str1.charAt(0).toUpperCase() + str1.slice(1);
      } else{
        return '';
      }
    }

    render()
    {
      const {name} = this.state.user;
        return (
        <div>
          <Container fluid className='mt-1 top_container'>
            <Row>
              <div style={{width: '100%', height: '100px'}} className="d-flex justify-content-around align-items-center">
                <Col sm='3' className='d-flex justify-content-center'>
                 <div style={{ display: 'inline-block'}}>
                  <div style={{marginTop: '-30px'}} className='text-center'>
                    <a href='/'><h1 className='asjay'>ASJAY</h1></a>
                    </div>
                    <div style={{marginTop: '-40px'}}>
                    <h5 className='asjay'>make your life easier</h5>
                    </div>
                 </div>                </Col>
                <Col sm='6' className='d-flex justify-content-center'>
                {/* <Autocomplete
                  value={ this.state.value }
                  inputProps={{ id: 'states-autocomplete' }}
                  wrapperStyle={{ position: 'relative', display: 'inline-block' }}
                  items={ getStocks() }
                  getItemValue={ item => item.name }
                  shouldItemRender={ matchStocks }
                  onChange={(event, value) => this.setState({ value }) }
                  onSelect={ value => this.setState({ value }) }
                  renderMenu={ children => (
                    <div className = "menu">
                      { children }
                    </div>
                  )}
                  renderItem={ (item, isHighlighted) => (
                    <div
                      className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                      key={ item.abbr } >
                      { item.name }
                    </div>
                  )}
                /> */}
                <Form action='/search' method='get' inline>
                    <FormGroup>
                      <Input className='mr-3' type='text' placeholder='Search in title' name='search'/>
                      <Button type='submit'>Search</Button>
                    </FormGroup>
                  </Form>
                </Col>
                  <Col sm='3' className='d-flex justify-content-center'>
                      <ButtonDropdown style={{ height: '60px' }} className='mr-3 btnNav' isOpen={this.state.dropdownOpen} toggle={this.toggleUser}>
                          <DropdownToggle caret color="info">
                              {/* <img style={{filter: 'invert(100%)'}} src={usr} alt="usr"/> */}
                              <FontAwesomeIcon icon={faUserAlt} style={{fontSize: '20px'}}/>
                          </DropdownToggle>
                          {(this.props.isAuthenticated ?
                              <DropdownMenu>
                                  <DropdownItem header>Hello {this.capitalize(name)}</DropdownItem>
                                  <DropdownItem divider />
                                  <DropdownItem>
                                    <FontAwesomeIcon icon={faCartArrowDown} style={{fontSize: '20px', marginRight: '5px'}}/>
                                    <Link style={{color: 'black'}} to="/myorder">My orders</Link>
                                  </DropdownItem>
                                  <DropdownItem divider />
                                  <DropdownItem>
                                    <FontAwesomeIcon icon={faSitemap} style={{fontSize: '20px', marginRight: '5px'}}/>
                                    <Link style={{color: 'black'}} to="/configurator">Configurator</Link>
                                  </DropdownItem>
                                  <DropdownItem divider />
                                  <DropdownItem>
                                    <FontAwesomeIcon icon={faUserCircle} style={{fontSize: '20px', marginRight: '5px'}}/>
                                    <Link style={{color: 'black'}} to="/profile">Profile</Link>
                                  </DropdownItem>
                                  <DropdownItem divider />


                              </DropdownMenu>
                              :
                              <DropdownMenu>
                                  <DropdownItem header>Hello Stranger</DropdownItem>
                                  <DropdownItem>
                                    <FontAwesomeIcon icon={faCartArrowDown} style={{fontSize: '20px', marginRight: '5px'}}/>
                                    <Link style={{color: 'black'}} to="/myorder">My orders</Link>
                                  </DropdownItem>
                                  <DropdownItem divider />
                                  <DropdownItem>
                                    <FontAwesomeIcon icon={faSignInAlt} style={{fontSize: '20px', marginRight: '5px'}}/>
                                    <Link style={{color: 'black'}} to="/register">Register</Link>
                                  </DropdownItem>
                                  <DropdownItem divider />
                                  <DropdownItem>
                                    <FontAwesomeIcon icon={faSignOutAlt} style={{fontSize: '20px', marginRight: '5px'}}/>
                                    <Link style={{color: 'black'}} to="/login">Log In</Link>
                                  </DropdownItem>
                              </DropdownMenu>)}
                      </ButtonDropdown>
                      {this.props.isAuthenticated &&
                      <button onClick={this.handleLogout} style={{ height: '60px' }} className='btn btn-secondary btnNav'><FontAwesomeIcon icon={faSignOutAlt} style={{fontSize: '25px'}}/></button>}
                  </Col>
              </div>
            </Row>
          </Container>

          <Container style={{marginTop:"-20px"}}>
            <Navbar color="info" light expand="md" style={{borderRadius: '7px'}}>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar className="d-flex justify-content-around">
                <Nav className="d-flex bd-highlight" navbar>
                  <NavItem className='p-2 flex-fill bd-highlight'>
                    <NavLink style={{color: 'white'}} href="/home">Home</NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar className='p-2 flex-fill bd-highlight'>
                    <DropdownToggle style={{color: 'white'}} nav caret>
                      Category
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        <NavItem className='p-2 flex-fill bd-highlight'>
                          <NavLink style={{color: '#00979d'}} href='/rtu'>House automation</NavLink>
                        </NavItem>
                      </DropdownItem>
                      <DropdownItem>
                        <NavItem className='p-2 flex-fill bd-highlight'>
                          <NavLink style={{color: '#00979d'}} href='/components'>Components</NavLink>
                        </NavItem>
                      </DropdownItem>
                      <DropdownItem>
                        <NavItem className='p-2 flex-fill bd-highlight'>
                          <NavLink style={{color: '#00979d'}} href='/all'>All</NavLink>
                        </NavItem>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <NavItem className='p-2 flex-fill bd-highlight'>
                    <NavLink style={{color: 'white'}} href="/cart">Cart {(this.state.countCart === "" ? "" : <Badge color='danger'>{this.state.countCart}</Badge>)}</NavLink>
                  </NavItem>
                  {this.props.isAuthenticated && this.state.role == 'admin' &&
                  <UncontrolledDropdown nav inNavbar className='p-2 flex-fill bd-highlight'>
                    <DropdownToggle style={{color: 'white'}} nav caret>
                      Admin
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        <NavItem className='p-2 flex-fill bd-highlight'>
                          <NavLink style={{color: '#00979d'}} href="#">Panel Users</NavLink>
                        </NavItem>
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>
                        <NavItem className='p-2 flex-fill bd-highlight'>
                          <NavLink style={{color: '#00979d'}} href="/dashboard">Panel Products</NavLink>
                        </NavItem>
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>
                        <NavItem className='p-2 flex-fill bd-highlight'>
                          <NavLink style={{color: '#00979d'}} href="/orders">Orders/Providers</NavLink>
                        </NavItem>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>}
                  <NavItem className='p-2 flex-fill bd-highlight'>
                    <NavLink style={{color: 'white'}} href="/news">News</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </Container>
        </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(Header);

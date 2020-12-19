import React, {Component} from 'react'
import {Navbar, NavbarBrand, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownItem, DropdownMenu, Collapse, NavbarToggler, Nav, Button} from 'reactstrap'
import {connect} from "react-redux" 
import firebase from '../../../Config/firebase'
import classes from './Heading.module.css'

class Heading extends Component {
    constructor(props) {
        super(props);
        this.state={
            isOpen:false
        }
    }

    toggle=() => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    
    render() {
        return (
          <Navbar className={classes.navbar} color='danger'expand='md'>
            <NavbarBrand className={classes.NavbarBrand} href='/'><span className={classes.icon}>🐺</span><span className={classes.span}> Welcome to Northeastern <strong>Job Blog</strong>!</span></NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='mr-auto' navbar>
                <NavItem>
                  <NavLink className={classes.NavLink} href='/new-article'>✍️  Draft New Job Post</NavLink>
                </NavItem>
              </Nav>  
              {
                this.props.auth.isEmpty ?
                  '':
                  this.props.auth.displayName
              }
              <UncontrolledDropdown>
                <DropdownToggle className={classes.DropdownToggle} nav caret>
                  ⚙️  Options
                </DropdownToggle>
                <DropdownMenu right>
                  {
                      this.props.auth.isEmpty ?
                        <DropdownItem>
                          <NavLink href='/login'>Login</NavLink>
                        </DropdownItem>
                        :
                        <DropdownItem>

                          <Button color="danger" onClick={() => firebase.auth().signOut()}>
                            Logout
                          </Button>

                        </DropdownItem>
                  }
                </DropdownMenu>
              </UncontrolledDropdown>
            </Collapse>
          </Navbar>
        );
      }
}

const enhance = connect(
    ({firebase: {auth, profile}}) => ({
      auth,
      profile
    })
  
)
export default enhance(Heading)
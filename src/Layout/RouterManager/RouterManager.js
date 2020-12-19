import React, {Component} from 'react'
import {Switch, Route, withRouter} from 'react-router-dom'
import Main from '../Homepage/Main/Main';
import LoginPage from '../LoginPage/LoginPage';
import ViewArticle from '../ViewArticle/ViewArticle';
import NewArticle from '../NewArticle/NewArticle'; 
import EditArticle from '../NewArticle/EditArticle';
import {connect} from 'react-redux';
import Heading from '../Homepage/Heading/Heading';
import firebase from 'firebase'



const AdminOnly = (ComposedComponent, auth) => {
  class AdminOnly extends Component {
    constructor(props) {
      super(props);
      this.state={
        isPass: false
      }
    }

    componentWillMount() {
      if (!auth.isEmpty) {
        firebase.auth().currentUser.getIdTokenResult()
          .then((idTokenResult) => {
            this.setState({
                isPass: true
            })
          })
      } else {        
        this.props.history.push('/login')
      }
    }
    
    render() {
      if (this.state.isPass) {
        return <ComposedComponent location={this.props.location} history={this.props.history} auth={auth}/>
      } else {
        return (
          <div>
            Checking...
          </div>
        )
      }
    }
  }
  return AdminOnly
}

class RouterManager extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  render() {
    return (
      <div>
        <Heading />
        {
          this.props.auth.isLoaded?
          <Switch>
            <Route path="/" exact>
                <Main />
            </Route>
            <Route path="/login">
                <LoginPage />
            </Route>
            <Route path="/article/:id">
                <ViewArticle />
            </Route>
            <Route path='/new-article' component={AdminOnly(NewArticle, this.props.auth)}>
            </Route>
            <Route path='/edit-article' component={AdminOnly(EditArticle, this.props.auth)}>
            </Route>
          </Switch>
          : ''
      }
      </div>
    );
  }
}

const enhance = connect(
  ({firebase: {auth, profile}}) => ({
    auth,
    profile
  })

)
export default enhance(withRouter(RouterManager))
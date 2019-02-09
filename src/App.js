import React, { Component } from 'react';
import './App.css';
import SimpleExample from './SimpleExample';
import { fetchSchools, addSchool, login, fetchGeo, register } from './actions';
import { connect } from 'react-redux';
import AddSchool from './AddSchool';
import LoginForm from './LoginForm'



class App extends Component {

  componentDidMount() {
    this.props.fetchSchools();     
  }
  

  render() {
    return (
      <div>
        <LoginForm {...this.props} />
        <SimpleExample {...this.props} />     
        <AddSchool {...this.props} /> 
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    schools: state.schools,
    isFetching: state.isFetching,
    error: state.error,  
    schoolAdded:state.schoolAdded  
  };
};

export default connect(mapStateToProps, { fetchSchools, addSchool, login, fetchGeo, register })(App);
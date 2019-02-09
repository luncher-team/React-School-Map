import React, { Component } from 'react'
import { Form, Input } from 'reactstrap';

export default class LoginForm extends Component {
  constructor(){
    super();
    this.state = {
      username: '',
      password: '',
      email: ''
    }
  }


  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLogin = e => {
    e.preventDefault();
    let login = this.state;
    this.props.login(login);  
  }

  handleRegister = e => {
    e.preventDefault();
    let register = this.state;
    this.props.register(register);  
  }


  render() {
    return (
      <div className="loginForm">
      <h3>Log In below...</h3>
         <Form>
                <div>
                    <label htmlFor="">Username</label>
                    <Input
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                        type="text"
                    />
                </div>
                <div>
                    <label htmlFor="">Password</label>
                    <Input
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        type="password"
                    />
                </div>
                <div>
                    <label htmlFor="">Email</label>
                    <Input
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        type="text"
                    />
                </div>
                <div>
                    <button onClick = {this.handleRegister} type="submit">Register</button>                   
                </div>
                <div>
                    <button onClick = {this.handleLogin} type="submit">Signin</button>                   
                </div>
            </Form>
      </div>
    )
  }
}

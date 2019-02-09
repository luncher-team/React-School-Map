import React, { Component } from 'react';
import Axios from 'axios'
import { Form, Input, Button, FormGroup, Modal } from 'reactstrap';

export default class AddSchool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curSchool: '',
      curDescription: '',
      curAddress: '',
      curCity: '',
      curState: '',
      curFunds: '',
      curDonated: 0      
    }

    this.toggle = this.toggle.bind(this);
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    Axios
      .get(`http://open.mapquestapi.com/geocoding/v1/address?key=BXePamQFbEaWWQEx1Dn6eANoiTPAzVyI&location=${this.state.curAddress}, ${this.state.curCity} ${this.state.curState}`)
      .then(res => {
        console.log(res.data.results[0].locations[0].latLng.lat)
        let schoolHold = {
          name: this.state.curSchool,
          description: this.state.curDescription,
          address: this.state.curAddress,
          requested_funds: this.state.curFunds,
          donated: this.state.curDonated,
          city: this.state.curCity,
          state: this.state.curState,
          lat: res.data.results[0].locations[0].latLng.lat,
          lon: res.data.results[0].locations[0].latLng.lng
        }
        console.log(schoolHold)
        this.props.addSchool(schoolHold);
        this.setState({
          curSchool: '',
          curDescription: '',
          curAddress: '',
          curCity: '',
          curState: '',
          curFunds: '',
          curDonated: 0,
          modal: false
        })
         
      })
      .catch(err => console.error(err));
      this.props.fetchSchools();
  }


  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }


  render() {
    return (
      <div className="addSchoolDiv"> 
        
        <Form onSubmit={e => this.handleSubmit(e)}>
          <FormGroup>
            <Input required onChange={this.handleChange} type="text" placeholder="School name" name="curSchool" value={this.state.curSchool} />
            <Input required onChange={this.handleChange} type="textarea" placeholder="School description" name="curDescription" value={this.state.curDescription} />
            <Input required onChange={this.handleChange} type="text" placeholder="School address" name="curAddress" value={this.state.curAddress} />
            <Input required onChange={this.handleChange} type="text" placeholder="City" name="curCity" value={this.state.curCity} />
            <Input required onChange={this.handleChange} type="text" placeholder="State" name="curState" value={this.state.curState} />
            <Input required onChange={this.handleChange} type="number" placeholder="Funds requested" name="curFunds" value={this.state.curFunds} />

          </FormGroup>
          <Button>Submit</Button>
        </Form>
        
      </div>
    )
  }
}
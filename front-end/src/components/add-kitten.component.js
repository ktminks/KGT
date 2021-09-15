import React, { Component } from "react";
import KittenDataService from "../services/data.service";

export default class AddKitten extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.saveKitten = this.saveKitten.bind(this);
    this.newKitten = this.newKitten.bind(this);

    this.state = {
      id: null,
      name: "",
      gender: "", 
      published: false,

      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeGender(e) {
    this.setState({
      gender: e.target.value
    });
  }

  saveKitten() {
    var data = {
      name: this.state.name,
      gender: this.state.gender
    };

    KittenDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          gender: response.data.gender,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newKitten() {
    this.setState({
      id: null,
      name: "",
      gender: "",
      published: false,

      submitted: false
    });
  }

 render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newKitten}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <input
                type="text"
                className="form-control"
                id="gender"
                required
                value={this.state.gender}
                onChange={this.onChangeGender}
                name="gender"
              />
            </div>

            <button onClick={this.saveKitten} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
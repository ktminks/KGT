import React, { Component } from "react";
import KittenDataService from "../services/data.service";

export default class Kitten extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.getKitten = this.getKitten.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateKitten = this.updateKitten.bind(this);
    this.deleteKitten = this.deleteKitten.bind(this);

    this.state = {
      currentKitten: {
        id: null,
        name: "",
        gender: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getKitten(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentKitten: {
          ...prevState.currentKitten,
          name: name
        }
      };
    });
  }

  onChangeGender(e) {
    const gender = e.target.value;
    
    this.setState(prevState => ({
      currentKitten: {
        ...prevState.currentKitten,
        gender: gender
      }
    }));
  }

  getKitten(id) {
    KittenDataService.get(id)
      .then(response => {
        this.setState({
          currentKitten: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentKitten.id,
      name: this.state.currentKitten.name,
      gender: this.state.currentKitten.gender,
      published: status
    };

    KittenDataService.update(this.state.currentKitten.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentKitten: {
            ...prevState.currentKitten,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateKitten() {
    KittenDataService.update(
      this.state.currentKitten.id,
      this.state.currentKitten
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The kitten was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteKitten() {    
    KittenDataService.delete(this.state.currentKitten.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/kittens')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentKitten } = this.state;

    return (
      <div>
        {currentKitten ? (
          <div className="edit-form">
            <h4>Kitten</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentKitten.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <input
                  type="text"
                  className="form-control"
                  id="gender"
                  value={currentKitten.gender}
                  onChange={this.onChangeGender}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentKitten.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentKitten.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteKitten}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateKitten}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Kitten...</p>
          </div>
        )}
      </div>
    );
  }
}
import React from "react";
import { Link } from "react-router-dom";
import "./admin.css";
const posturl = "http://localhost:9700/adduser";

class Admin extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      city: "",
      phone: "",
      isActive: true,
      role: "User"
    };
  }

  handleChangeName = (event) => {
    this.setState({ name: event.target.value });
  };
  handleChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };
  handleChangeCity = (event) => {
    this.setState({ city: event.target.value });
  };
  handleChangePhone = (event) => {
    this.setState({ phone: event.target.value });
  };
  handleSubmit = () => {
    console.log(this.state);
    fetch(posturl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(
      this.setState({ name: "" }),
      this.setState({ city: "" }),
      this.setState({ phone: "" }),
      this.setState({ email: "" }),
      alert("New User Added"),
      this.props.history.push("/")
    );
  };

  popup = () => {};

  render() {
    return (
      <div className="admindiv">
        <center>
          <h2>
            <u>Add New User</u>
          </h2>
        </center>
        <form>
          <div className="form-group">
            <label for="name">Name:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Name"
              name="name"
              onChange={this.handleChangeName}
              value={this.state.name}
            />
          </div>
          <div className="form-group">
            <label for="city">City:</label>
            <input
              type="text"
              className="form-control"
              id="city"
              placeholder="Enter City"
              name="city"
              onChange={this.handleChangeCity}
              value={this.state.city}
            />
          </div>
          <div className="form-group">
            <label for="phone">Phone:</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              placeholder="Enter Phone"
              name="phone"
              onChange={this.handleChangePhone}
              value={this.state.phone}
            />
          </div>
          <div className="form-group">
            <label for="phone">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter Email"
              name="email"
              onChange={this.handleChangeEmail}
              value={this.state.email}
            />
          </div>
          <br />
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginRight: "10px" }}
            onClick={this.handleSubmit}
          >
            Add
          </button>
          <Link to="/" className="btn btn-success" role="button">
            cancel
          </Link>
        </form>
      </div>
    );
  }
}

export default Admin;

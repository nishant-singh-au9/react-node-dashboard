import React from "react";
import "./home.css";
const url = "https://react-node-dashboard-api.herokuapp.com/users";
const delurl = "https://react-node-dashboard-api.herokuapp.com/deleteUser";
const puturl = "https://react-node-dashboard-api.herokuapp.com/editUser";

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      data: "",
      name: "",
      email: "",
      phone: "",
      isActive: "",
      role: "",
      city: "",
      id: "",
      userStatus: ""
    };
  }

  saveChangeHandler = () => {
    const data = {
      _id: this.state.id,
      name: this.state.name,
      email: this.state.email,
      city: this.state.city,
      isActive: this.state.isActive,
      role: this.state.role,
      phone: this.state.phone
    };

    fetch(puturl, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then((json) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  deleteHandler = (id, role) => {
    if (role === "Admin") {
      alert("You cannot delete an Admin");
    } else {
      const topass = { _id: id };
      fetch(delurl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(topass)
      });
    }
  };

  editHandler = (id) => {
    const usrdetail = `https://react-node-dashboard-api.herokuapp.com/user/${id}`;
    fetch(usrdetail, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ name: data.name });
        this.setState({ city: data.city });
        this.setState({ phone: data.phone });
        this.setState({ email: data.email });
        this.setState({ role: data.role });
        this.setState({ id: data._id });
        this.setState({ isActive: data.isActive });
        if (data.isActive === true) {
          this.setState({ userStatus: "User is Active" });
        } else {
          this.setState({ userStatus: "User is Not Active" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  renderUsers = () => {
    if (this.state.data) {
      return this.state.data.map((item) => {
        return (
          <tr key={item._id}>
            <td>{item.name}</td>
            <td>{item.city}</td>
            <td>{item.phone}</td>
            <td>{item.email}</td>
            <td>{item.role}</td>
            <td>
              <button
                type="button"
                className="btn btn-warning"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={this.editHandler.bind(this, item._id)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                id={item._id}
                onClick={this.deleteHandler.bind(this, item._id, item.role)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      });
    }
  };
  render() {
    return (
      <>
        <center>
          <h1 style={{ marginTop: "20px" }}>
            <u>Users List</u>
          </h1>
        </center>
        <div className="homediv">
          <div className="table-responsive">
            <table className="table table-hover table-striped" id="myTable">
              <thead className="thead-dark">
                <tr>
                  <th>Name</th>
                  <th>City</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{this.renderUsers()}</tbody>
            </table>
          </div>
        </div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit User Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <input
                    type="text"
                    className="form-control"
                    id="update_id"
                    name="_id"
                    value={this.state.id}
                    disabled
                  />
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="update_name"
                      placeholder="Enter First name"
                      name="name"
                      value={this.state.name}
                      onChange={this.handleChangeName}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">City:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="update_city"
                      placeholder="Enter City"
                      name="city"
                      value={this.state.city}
                      onChange={this.handleChangeCity}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input
                      type="phone"
                      className="form-control"
                      id="update_phone"
                      placeholder="Enter phone"
                      name="phone"
                      value={this.state.phone}
                      onChange={this.handleChangePhone}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      id="update_email"
                      placeholder="Enter Email"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChangeEmail}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="role">Role:</label>
                    <input
                      type="role"
                      className="form-control"
                      id="update_role"
                      name="role"
                      value={this.state.role}
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="role">User Status:</label>
                    <input
                      type="role"
                      className="form-control"
                      id="update_active"
                      name="isActive"
                      value={this.state.userStatus}
                      disabled
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={this.saveChangeHandler}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
export default Home;

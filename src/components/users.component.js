import React, {Component} from "react";
import axios from "axios";
import UserDisplayComponent from "./user-display.component";

export default class UsersComponent extends Component {
    constructor(props) {
        super(props);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.deleteUser = this.deleteUser.bind(this);

        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            role: "",
            users: []
        };
    }

    onChangeFirstName(e) {
        this.setState({
            firstname: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            lastname: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeRole(e) {
        this.setState({
            role: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password,
            role: this.state.role
        };

        console.log(user);

        axios.post("http://localhost:5000/users/", user)
            .then(res => console.log(res.data));

        this.setState({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            role: ""
        });

        window.location.reload();
    }

    componentDidMount() {
        axios.get("http://localhost:5000/users/")
            .then(res => {
                this.setState({
                    users: res.data
                })
            })
            .catch(error => console.log("Error: "+error));
    }

    deleteUser(id) {
        axios.delete("http://localhost:5000/users/"+id)
            .then(res => console.log(res));

        this.setState({
            users: this.state.users.filter(el => el._id !== id)
        })
    }

    usersList() {
        return this.state.users.map(user => {
            return <UserDisplayComponent user={user} onDelete={this.deleteUser} key={user._id}/>
        })
    }

    render() {
        return(
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>First Name: </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.firstname}
                                onChange={this.onChangeFirstName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name: </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.lastname}
                                onChange={this.onChangeLastName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <label>Role: </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.role}
                                onChange={this.onChangeRole}
                        />
                    </div>
                    <br/>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
                <br/>
                <h3>Existing Users:</h3>
                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Role</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.usersList()}
                    </tbody>
                </table>
            </div>
        )
    }
}
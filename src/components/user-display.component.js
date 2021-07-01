import React from "react";

export default class UserDisplayComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                role: ""
            },
            onDelete: null
        };
    }

    render() {
        return (
            <tr>
                <td>{this.props.user.firstname}</td>
                <td>{this.props.user.lastname}</td>
                <td>{this.props.user.email}</td>
                <td>{this.props.user.password}</td>
                <td>{this.props.user.role}</td>
                <td>
                    <a href="#" onClick={() => {this.props.onDelete(this.props.user._id) }}>delete</a>
                </td>
            </tr>
        )
    }
}

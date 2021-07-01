import React from "react";

export default class SubscriptionDisplayComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            subscription: {
                user_id: "",
                status: "",
                valid_until: new Date()
            },
            onDelete: null
        };
    }

    render() {
        return (
            <tr>
                <td>{this.props.subscription.user_id}</td>
                <td>{this.props.subscription.status}</td>
                <td>{this.props.subscription.valid_until}</td>
                <td>
                    <a href="#" onClick={() => {this.props.onDelete(this.props.subscription._id) }}>delete</a>
                </td>
            </tr>
        )
    }
}

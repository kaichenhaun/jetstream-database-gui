import React from "react";

export default class ConnectorDisplayComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            connector: {
                connector_name: "",
                connector_type: ""
            },
            onDelete: null
        };
    }

    render() {
        return (
            <tr>
                <td>{this.props.connector.connector_name}</td>
                <td>{this.props.connector.connector_type}</td>
                <td>
                    <a href="#" onClick={() => {this.props.onDelete(this.props.connector._id) }}>delete</a>
                </td>
            </tr>
        )
    }
}

import React, {Component} from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import ConnectorDisplayComponent from "./connector-display";

export default class ConnectorsComponent extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.connectorList = this.connectorList.bind(this);
        this.deleteConnector = this.deleteConnector.bind(this);

        this.state = {
            connector_name: "",
            connector_type: "source",
            connectors: []
        };
    }

    onChangeName(e) {
        this.setState({
            connector_name: e.target.value
        });
    }

    onChangeType(e) {
        this.setState({
            connector_type: e.target.value
        });
    }

    componentDidMount() {
        axios.get("http://localhost:5000/connectors/")
            .then(res => {
                this.setState({
                    connectors: res.data
                })
            })
            .catch(error => console.log("Error: "+error));
    }

    onSubmit(e) {
        e.preventDefault();

        const connector = {
            connector_name: this.state.connector_name,
            connector_type: this.state.connector_type
        };

        console.log(connector);

        axios.post("http://localhost:5000/connectors", connector)
            .then(res => console.log(res.data));

        this.setState({
            connector_name: "",
            connector_type: "source"
        });

        window.location.reload();
    }

    connectorList() {
        return this.state.connectors.map(c => {
            return <ConnectorDisplayComponent connector={c} onDelete={this.deleteConnector} key={c._id}/>
        })
    }

    deleteConnector(id) {
        axios.delete("http://localhost:5000/connectors/"+id)
            .then(res => console.log(res));

        this.setState({
            connectors: this.state.connectors.filter(el => el._id !== id)
        })
    }

    render() {
        return(
            <div>
                <h3>Create New Connector</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Connector Name: </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.connector_name}
                                onChange={this.onChangeName}
                        />
                    </div>
                    <br/>
                    <div className="form-group">
                        <label>Connector Type: </label>
                        <br/>
                        <select value={this.state.connector_type} onChange={this.onChangeType} ref="userInput" required className="form-control">
                            <option value="source" key="source">Source</option>
                            <option value="endpoint" key="endpoint">Endpoint</option>
                        </select>
                    </div>
                    <br/>
                    <div className="form-group">
                        <input type="submit" value="Create Connector" className="btn btn-primary" />
                    </div>
                </form>
                <br/>
                <h3>Existing Connectors: </h3>
                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th>Connector Name</th>
                        <th>Connector Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.connectorList()}
                    </tbody>
                </table>
            </div>
        )
    }
}
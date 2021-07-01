import React, {Component} from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SubscriptionDisplayComponent from "./subscription-display";

export default class SubscriptionsComponent extends Component {
    constructor(props) {
        super(props);

        this.onChangeUserID = this.onChangeUserID.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeValidDate = this.onChangeValidDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.subscriptionsList = this.subscriptionsList.bind(this);
        this.deleteSubscription = this.deleteSubscription.bind(this);

        this.state = {
            user_id: "",
            status: "Inactive",
            valid_until: new Date(),
            subscriptions: []
        };
    }

    onChangeUserID(e) {
        this.setState({
            user_id: e.target.value
        });
    }

    onChangeStatus(e) {
        this.setState({
            status: e.target.value
        });
    }

    componentDidMount() {
        axios.get("http://localhost:5000/subscriptions/")
            .then(res => {
                this.setState({
                    subscriptions: res.data
                })
            })
            .catch(error => console.log("Error: "+error));
    }

    onChangeValidDate(date) {
        this.setState({
            valid_until: date
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const subscription = {
            user_id: this.state.user_id,
            status: this.state.status,
            valid_until: this.state.valid_until
        };

        console.log(subscription);

        axios.post("http://localhost:5000/subscriptions", subscription)
            .then(res => console.log(res.data));

        this.setState({
            user_id: "",
            status: "",
            valid_until: ""
        });

        window.location.reload();
    }

    subscriptionsList() {
        return this.state.subscriptions.map(sub => {
            return <SubscriptionDisplayComponent subscription={sub} onDelete={this.deleteSubscription} key={sub._id}/>
        })
    }

    deleteSubscription(id) {
        axios.delete("http://localhost:5000/subscriptions/"+id)
            .then(res => console.log(res));

        this.setState({
            subscriptions: this.state.subscriptions.filter(el => el._id !== id)
        })
    }

    render() {
        return(
            <div>
                <h3>Create New Subscription</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>User ID: </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.user_id}
                                onChange={this.onChangeUserID}
                        />
                    </div>
                    <br/>
                    <div className="form-group">
                        <label>Status: </label>
                        <br/>
                        <select value={this.state.status} onChange={this.onChangeStatus} ref="userInput" required className="form-control">
                            <option value="inactive" key="inactive">Inactive</option>
                            <option value="active" key="active">Active</option>
                        </select>
                    </div>
                    <br/>
                    <div className="form-group">
                        <label>Valid Until: </label>
                        <div>
                            <DatePicker
                                selected={this.state.valid_until}
                                onChange={this.onChangeValidDate}
                            />
                        </div>
                    </div>
                    <br/>
                    <div className="form-group">
                        <input type="submit" value="Create Subscription" className="btn btn-primary" />
                    </div>
                </form>
                <br/>
                <h3>Existing Subscriptions: </h3>
                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th>User ID</th>
                        <th>Status</th>
                        <th>Valid Until</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.subscriptionsList()}
                    </tbody>
                </table>
            </div>
        )
    }
}
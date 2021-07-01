import React, {Component} from "react";
import {Link} from "react-router-dom";

export default class NavbarComponent extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                {/*<Link to="/" className="navbar-brand"></Link>*/}
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/connectors" className="nav-link">Connectors</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/users" className="nav-link">Users</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/subscriptions" className="nav-link">Subscriptions</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
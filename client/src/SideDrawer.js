import React from "react";
import { Link } from "react-router-dom";

import "./SideDrawer.css";

const sideDrawer = props => {
    let drawerClasses = "side-drawer";
    if (props.show) {
        drawerClasses = "side-drawer open";
    }
    return(
        <nav className={drawerClasses}>
            <ul>
                <li><Link className="link" to="/" onClick={props.click}>Home</Link></li>
                <li><Link className="link" to="/signup" onClick={props.click}>Login</Link></li>
            </ul>
        </nav>
    );
};

export default sideDrawer;
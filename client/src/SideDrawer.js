import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout } from "./auth";

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
                <li><Link className="link" to="/signin" onClick={props.click}>Login</Link></li>
                <li>
                    <span 
                        className="link" 
                        style={{ cursor: "pointer" }}
                        onClick={() => 
                            signout(() => {
                                window.location="/";
                            })
                        }
                    >
                        Logout
                    </span>
                </li>
            </ul>
        </nav>
    );
};

export default withRouter(sideDrawer);
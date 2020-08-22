import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "./auth";

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
                {
                    isAuthenticated() && isAuthenticated().user.role === 1 && <li><Link className="link" to="/admin/dashboard" onClick={props.click}>Dashboard</Link></li>
                }
                {
                    !isAuthenticated() && <li><Link className="link" to="/signin" onClick={props.click}>Login</Link></li>
                }
                {
                    !isAuthenticated() && <li><Link className="link" to="/signup" onClick={props.click}>Register</Link></li>
                }
                {
                                isAuthenticated() && 
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
                            }
            </ul>
        </nav>
    );
};

export default withRouter(sideDrawer);
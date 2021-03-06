import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import DrawerToggleButton from "../DrawerToggleButton";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";

import "./Navbar.css";
import Logo from "../images/organic-coffeestry.png";

class Navbar extends Component {
    render() {
        return (
            <header className="toolbar">
                <nav className="toolbar__navigation">
                    <div className="logo">
                        <Link to="/"><img className="nav-title" src={Logo} alt="" /></Link>
                    </div>
                    <div className="toolbar_navigation-items">
                        <ul className="nav-links">
                            <li><Link className="link" to="/">Home</Link></li>
                            <li className="cart-link"><Link className="link" to="/cart">Cart{" "}<sup><small className="cart-badge">{itemTotal()}</small></sup></Link></li>
                            {
                                isAuthenticated() && isAuthenticated().user.role === 1 && <li><Link className="link" to="/admin/dashboard">Dashboard</Link></li>
                            }
                            {
                                isAuthenticated() && isAuthenticated().user.role === 0 && <li><Link className="link" to="/user/dashboard">Dashboard</Link></li>
                            }
                            {
                                !isAuthenticated() && <li><Link className="link" to="/signin">Login</Link></li>
                            }
                            {
                                !isAuthenticated() && <li><Link className="link" to="/signup">Register</Link></li>
                            }
                            {
                                isAuthenticated() && 
                                <li>
                                    <span 
                                        className="link" 
                                        style={{ cursor: "pointer" }}
                                        onClick={() => 
                                            signout(() => {
                                                this.props.history.push("/");
                                            })
                                        }
                                    >
                                        Logout
                                    </span>
                                </li>
                            }
                        </ul>
                    </div>
                    <div className="toolbar__toggle-button">
                        <DrawerToggleButton click={this.props.drawerClickHandler} />
                    </div>
                </nav>
            </header>
        );
    };
};

export default withRouter(Navbar);
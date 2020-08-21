import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import DrawerToggleButton from "../DrawerToggleButton";

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
                            <li><Link className="link" to="/signup">Login</Link></li>
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

export default Navbar;
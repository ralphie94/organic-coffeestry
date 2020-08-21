import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./home/Home";
import Navbar from "./home/Navbar";
import SideDrawer from "./SideDrawer";
import Backdrop from "./Backdrop";

class Routes extends Component {
    state = {
        currentUser: null,
        sideDrawerOpen: false
    };

    doSetCurrentUser = user =>
    this.setState({
      currentUser: user
    });

    drawerTogglerClickHandler = () => {
        this.setState((prevState) => {
          return {sideDrawerOpen: !prevState.sideDrawerOpen};
        });
    };

    backdropClickHandler = () => {
        this.setState({sideDrawerOpen: false});
    };

    render() {
        let backdrop;

        if (this.state.sideDrawerOpen) {
            backdrop = <Backdrop click={this.backdropClickHandler} />
        }
        return (
            <div>
                <BrowserRouter>
                    <Navbar drawerClickHandler={this.drawerTogglerClickHandler} />
                    <SideDrawer show={this.state.sideDrawerOpen} click={this.backdropClickHandler} />
                    {backdrop}
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/signin" exact component={Signin} />
                        <Route path="/signup" exact component={Signup} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    };
};

export default Routes;
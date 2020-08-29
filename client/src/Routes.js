import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./home/Home";
import Navbar from "./home/Navbar";
import SideDrawer from "./SideDrawer";
import Backdrop from "./Backdrop";
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./user/AdminDashboard";
import AddProduct from "./admin/AddProduct";
import Product from "./home/Product";
import Cart from "./home/Cart";
import Checkout from "./home/Checkout";
import Orders from "./admin/Orders";

class Routes extends Component {
    state = {
        sideDrawerOpen: false
    };

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
                        <AdminRoute
                            path="/admin/dashboard"
                            exact
                            component={AdminDashboard}
                        />
                        <AdminRoute
                            path="/create/product"
                            exact
                            component={AddProduct}
                        />
                        <Route path="/product/:productId" exact component={Product} />
                        <Route path="/cart" exact component={Cart} />
                        <Route path="/checkout" exact component={Checkout} />
                        <AdminRoute
                            path="/admin/orders"
                            exact
                            component={Orders}
                        />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    };
};

export default Routes;
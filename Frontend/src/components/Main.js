import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import Delete from './Delete/Delete';
import Create from './Create/Create';
import Navbar from './LandingPage/Navbar';
//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Navbar}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/home" component={Home}/>
                <Route exact path="/delete" component={Delete}/>
                <Route exact path="/create" component={Create}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;
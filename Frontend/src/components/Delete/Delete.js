import React, {Component} from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';

class Delete extends Component{

    constructor(props) {
        super(props);
        this.state = {
            bookId : "",
            wrongInputField: false,
            errorMessage: "",
            response: ""
        }
        this.submitHandler = this.submitHandler.bind(this);
    }

    handleChange = e => {
        this.setState({bookId: e.target.value});
    }

    submitHandler = e => {
        var headers = new Headers();
        e.preventDefault();
        const data = {
            BookID: this.state.bookId,
        }
        if (this.state.bookId.length > 0) {
            axios.defaults.withCredentials = true;
            axios.post('http://localhost:3001/delete', data)
                .then(response => {
                    if (response.status === 200 && response.data === "BookDeleted") {
                        this.setState({ bookId: "", response: "success" });
                    } else {
                        this.setState({ wrongInputField: true, errorMessage: "Book ID does not exist." });
                    }
                })
        } else {
            this.setState({ wrongInputField: true, errorMessage: "Please enter the Book ID." });
        }
    }

    render() {
         //if not logged in go to login page
         let redirectVar = null;
         if(!cookie.load('cookie')){
             redirectVar = <Redirect to= "/login"/>
         } else if (this.state.response === "success") {
            redirectVar = <Redirect to= "/home"/>
        } else {
            redirectVar = null;
        }
        return (
            <div>
                {redirectVar}
                <div class="container" style={{width:"700px", margin: "0 auto"}}>
                    <form>
                        <div class="form-group">
                            <input onChange={this.handleChange} value={this.state.bookId}  type="text" class="form-control" name="bookId" placeholder="Search a Book by Book ID"/>
                        </div>
                        {this.state.wrongInputField ? <div class="alert alert-danger alert-dismissable">{ this.state.errorMessage }</div> : null }
                        <br />
                        <div>
                            <button onClick = {this.submitHandler} class="btn btn-success w-100" type="submit">Delete</button>
                        </div> 
                    </form>
                </div>
            </div>
        )
    }
}

export default Delete;
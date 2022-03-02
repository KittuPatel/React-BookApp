import React, {Component} from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';

class Create extends Component{

    constructor(props) {
        super(props);
        this.state = {
            bookId : "",
            bookTitle : "",
            bookAuthor: "",
            wrongInputFields: false,
            errorMessage: "",
            response: ""
        }
        this.submitHandler = this.submitHandler.bind(this);
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    submitHandler = e => {
        var headers = new Headers();
        e.preventDefault();
        const data = {
            BookID: this.state.bookId,
            Title: this.state.bookTitle,
            Author: this.state.bookAuthor
        }
        if (data.BookID.length > 0 && data.Title.length > 0 && data.Author.length > 0) { 
            //set the with credentials to true
            axios.defaults.withCredentials = true;
            //make a post request wiwth the user data
            axios.post('http://localhost:3001/create',data)
                .then(response => {
                    console.log("Status Code : ",response.status);
                    if (response.status === 200 && response.data === "BookCreated") {
                        this.setState({ bookId: "", bookTitle: "", bookAuthor: "", response: "success" });
                    } else {
                        this.setState({ wrongInputFields: true, errorMessage: "Book ID already exists." });
                    }
                })
        } else {
            this.setState({ wrongInputFields: true, errorMessage: "Please enter all the fields" });
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
        return(
            <div>
                {redirectVar}
                <br/>
                <div class="container" style={{width:"700px", margin: "0 auto"}}>
                    <form action="http://127.0.0.1:3000/create" method="post">
                        <div class="form-group">
                            <input
                                type="text"
                                class="form-control"
                                onChange={this.handleChange}
                                value={this.state.bookId}
                                name="bookId"
                                placeholder="Book ID" />
                        </div>
                        <br/>
                        <div class="form-group">
                            <input
                                type="text"
                                class="form-control"
                                onChange={this.handleChange}
                                value={this.state.bookTitle}
                                name="bookTitle"
                                placeholder="Book Title" />
                        </div>
                        <br/>
                        <div class="form-group">
                            <input
                                type="text"
                                class="form-control"
                                onChange={this.handleChange}
                                value={this.state.bookAuthor}
                                name="bookAuthor"
                                placeholder="Book Author" />
                        </div>
                        <br />
                        {this.state.wrongInputFields ? <div class="alert alert-danger alert-dismissable">{ this.state.errorMessage }</div> : null }
                        <div>
                            <button onClick = {this.submitHandler} class="btn btn-success" type="submit">Create Book</button>
                        </div> 
                    </form>
                </div>
            </div>
        )
    }
}

export default Create;
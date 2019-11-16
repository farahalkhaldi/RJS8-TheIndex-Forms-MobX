import React, { Component } from "react";
import { observer } from "mobx-react";

import bookStore from "../stores/bookStore";

class BookForm extends Component {
    state = {
        title: "",
        color: ""
    };

    submitBook = event => {
        const authorID = this.props.author.id;
        console.log("hello author", authorID);
        event.preventDefault();
        bookStore.addBook(this.state, authorID);
        if (!bookStore.errors) {
            this.props.closeModal();
        }
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        return (
            <div className="mt-5 p-2">
                <form onSubmit={this.submitBook}>
                    {bookStore.errors && (
                        <div className="alert alert-danger" role="alert">
                            {bookStore.errors.map(error => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    )}
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Title</span>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Color</span>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            name="color"
                            value={this.state.color}
                            onChange={this.handleChange}
                        />
                    </div>

                    <input type="submit" />
                </form>
            </div>
        );
    }
}

export default observer(BookForm);
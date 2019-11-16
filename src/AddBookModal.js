import React, { Component } from "react";

import BookForm from "./forms/BookForm";
import Modal from "react-responsive-modal";

class AddBookModal extends Component {
  state = {
    open: false
  };

  onOpenModal = () => this.setState({ open: true });

  onCloseModal = () => this.setState({ open: false });

  render() {
    const { open } = this.state;
    return (
      <div>
        <Modal open={open} onClose={this.onCloseModal} center>
          <BookForm closeModal={this.onCloseModal} author={this.props.author} />
        </Modal>
        <input type="button" onClick={this.onOpenModal} value="Add New Book!" />
      </div>
    );
  }
}
export default AddBookModal;

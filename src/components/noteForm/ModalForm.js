// ModalForm.js

import React from "react";
import Modal from "react-bootstrap/Modal";
import './ModalForm.css' // Import the style.css file

function ModalForm(props) {
  return (
      <Modal show={props.showModal} onHide={props.toggleModal} className="modal_custom">
        <Modal.Header closeButton className="model_header">
          <Modal.Title>Add New Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
      </Modal>
  );
}

export default ModalForm;

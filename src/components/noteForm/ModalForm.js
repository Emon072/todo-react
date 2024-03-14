// ModalForm.js

import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import './ModalForm.css' // Import the style.css file

function ModalForm(props) {
  return (
      <Modal show={props.showModal} onHide={props.toggleModal} className="modal_custom">
        <Modal.Header closeButton className="model_header">
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
      </Modal>
  );
}

export default ModalForm;

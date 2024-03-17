import React , {useState} from 'react'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AddDirectoryModal(props) {

    const handleClose = () => {
      props.setshowDirectory(false);
      props.setnewDirectoryName("");
    };
  
    return (
      <>
        <Modal show={props.showDirectory} onHide={handleClose} className="modal_custom">
            <Modal.Header closeButton className="model_header">
            <Modal.Title>Add New Directory</Modal.Title>
            </Modal.Header>
          <Modal.Body>{props.children}</Modal.Body>
        </Modal>
      </>
    );
  }

export default AddDirectoryModal
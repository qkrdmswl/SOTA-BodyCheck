import React from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";


const FindId = ({ show, onHide }) => {
    return (
        <Modal
          show={show}
          onHide={onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Container>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">Find ID</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Name" />
                </Form.Group>
    
                <Form.Group>
                  <Form.Label>E-Mail</Form.Label>
                  <Form.Control type="Emaol" placeholder="Enter E-Mail" />
                </Form.Group>
    
                <Button block variant="info" type="button" className="my-3">
                  Submit
                </Button>
    
    
              </Form>
            </Modal.Body>
          </Container>
        </Modal>
    );
}

export default FindId;
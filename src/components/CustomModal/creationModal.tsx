import React, { useState } from "react";
import { Modal } from "react-bootstrap";

interface CustomModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  isEditing: boolean;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  buttonText: string;
}

const CustomModalComponent: React.FC<CustomModalProps> = ({
  show,
  onClose,
  title,
  isEditing,
  children,
  onSubmit,
  buttonText,
  size ,
}) => {
  return (
    <Modal show={show} onHide={onClose} backdrop="static" keyboard={false} centered  size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="h5">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form action="" className="horizontal-form" onSubmit={onSubmit}>
          {children}
          <div className="form-group mb-4">
            <button className="w-full custom-active-button rounded-lg" type="submit">
              {buttonText}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CustomModalComponent;


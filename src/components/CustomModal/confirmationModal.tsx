import React from "react";
import Modal from "react-bootstrap/Modal";
import { confirmationIcon, warningIcon } from "assets";

interface ConfirmationModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  mode: "create" | "edit";
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  show,
  onHide,
  onConfirm,
  isLoading = false,
  title = "",
  message = "Do you want to proceed with this action?",
  confirmText = "Yes",
  cancelText = "No",
  mode,
}) => {


  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="h5">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-wrap flex-col gap-4 text-center">
          <img
            src={confirmationIcon || warningIcon}
            className="block mx-auto"
            alt="warning-Icon"
            width={80}
          />
          <p>{message}</p>
          <div className="flex gap-2 justify-center">
            <button
              type="button"
              className="w-full custom-inactive-button rounded-lg"
              onClick={onHide}
            >
              {cancelText}
            </button>
            <button
              type="button"
              className="w-full custom-active-button rounded-lg"
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : confirmText}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmationModal;

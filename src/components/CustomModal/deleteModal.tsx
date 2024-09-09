import React from "react";

import Modal from "react-bootstrap/Modal";
import { confirmationIcon } from "assets";

interface DeleteConfirmationModalProps {
  show: boolean;
  onHide: () => void;
  onConfirmDelete: () => void;
  isDeleting: boolean;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  show,
  onHide,
  onConfirmDelete,
  isDeleting,
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <form className="horizontal-form">
          <div className="flex flex-wrap flex-col gap-4">
            <img
              src={confirmationIcon}
              className="block mx-auto"
              alt="questionIcon"
              width={80}
            />
            <h5 className="m-0 text-center">Are you sure you want to delete?</h5>
            <div className="flex gap-2">
              <button
                type="button"
                className="w-full custom-inactive-button rounded-lg"
                onClick={onConfirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Yes"}
              </button>
              <button
                type="button"
                className="w-full custom-active-button rounded-lg"
                onClick={onHide}
              >
                No
              </button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteConfirmationModal;

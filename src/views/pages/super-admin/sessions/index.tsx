
import React, { useState, useEffect } from "react";
import "./style.scss";
import CustomModalComponent from "components/CustomModal/creationModal";
import CustomTableComponent from "components/CustomModal/tableModal";
import ConfirmationModal from "components/CustomModal/confirmationModal";
import DeleteConfirmationModal from "components/CustomModal/deleteModal";
import { toastError } from "helpers/toastHelper";

interface TableRow {
  id: string;
  sno: number;
  name: string;
  start_date: string;
  end_date: string;
  description: string;
}

const Session = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [sessionData, setSessionData] = useState({ start_date: "", end_date: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [showCreateEditModal, setShowCreateEditModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deletingId, setDeletingId] = useState<string[] | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errors, setErrors] = useState<{ start_date?: string; end_date?: string }>({});

  useEffect(() => {
    // Mock data fetching
    setTimeout(() => {
      setTableData([
        { id: "1", sno: 1, name: "Session 1", start_date: "2023-01-01", end_date: "2023-01-05", description: "Description 1" },
        { id: "2", sno: 2, name: "Session 2", start_date: "2023-02-01", end_date: "2023-02-05", description: "Description 2" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // / Define columns for the table //
  const columns = [
    { header: "S.No", key: "sno" },
    { header: "Session Name", key: "name" },
    { header: "Start Date", key: "start_date" },
    { header: "End Date", key: "end_date" },
    { header: "Description", key: "description", width: "40%" },
  ];

  const handleModalOpen = (id: string) => {
    setIsEditing(false);
    setShowModal(true);
    setDeletingId([id]);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setDeletingId(null);
  };

  const handleConfirmDelete = async () => {
    if (deletingId !== null) {
      setIsDeleting(true);
      try {
        setShowModal(false);
        setDeletingId(null);
      } catch (error) {
        toastError("Error deleting session");
      } finally {
        setIsDeleting(false);
      }
    } else {
      toastError("Cannot delete: No ID provided");
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddNew = () => {
    setIsEditing(false);
    setSessionData({ start_date: "", end_date: "", description: "" });
    setErrors({ start_date: "", end_date: "" });
    setShowCreateEditModal(true);
  };

  const handleCreateEditModalClose = () => {
    setShowCreateEditModal(false);
  };

  const handleConfirmationModalClose = () => {
    setShowConfirmationModal(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setSessionData((prevData) => ({ ...prevData, [id]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const { start_date, end_date } = sessionData;
    const newErrors: { start_date?: string; end_date?: string } = {};
  
    if (!start_date) {
      newErrors.start_date = "Please select start date.";
    }
    if (!end_date) {
      newErrors.end_date = "Please select end date.";
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      console.log("Form submitted:" );

      setShowCreateEditModal(false); 
    }
  };
  


  const handleConfirm = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowCreateEditModal(false);
      setShowConfirmationModal(false);
    }, 1000);
  };

  const handleEdit = ()=>{

  }

  return (
    <>
      <div className={`container ${showConfirmationModal ? 'blur-effect' : ''}`}>
        <div className="inner-section d-flex gap-1 flex-wrap items-center justify-content-between">
          <div className="left-area">
            <h6>Session List</h6>
          </div>
          <div className="right-area">
            <button className="custom-active-button rounded-lg" onClick={handleAddNew}>
              Add New Session
            </button>
          </div>
        </div>
      </div>

      <div className={`container ${showConfirmationModal ? 'blur-effect' : ''}`}>
        <div className="action-area">
          <div className="search-div">
            <span className="search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a5a5a5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search by Session Name"
              value={searchQuery}
              onChange={handleSearch}
              className="form-control"
            />
          </div>
        </div>

        <CustomTableComponent
          columns={columns}
          data={tableData}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleModalOpen} 
          emptyMessage="No sessions available"
        />
      </div>

      <CustomModalComponent
        show={showCreateEditModal}
        onClose={handleCreateEditModalClose}
        title={isEditing ? "Update Session" : "Create New Session"}
        isEditing={isEditing}
        onSubmit={handleFormSubmit}
        buttonText={isEditing ? "Update" : "Save"}
        // className={showConfirmationModal ? 'blur-effect' : ''}
      >


        {/* Modal Fields */}
        <div className="form-group mb-4">
          <label htmlFor="start_date">
            Start Date<span className="form_required">*</span>
          </label>
          <input
            id="start_date"
            type="date"
            onKeyDown={(e) => e.preventDefault()}
            className="form-control"
            placeholder="Enter Start Date"
            value={sessionData.start_date}
            onChange={handleInputChange}
          />
          {errors.start_date && <div className="error">{errors.start_date}</div>}
        </div>

        <div className="form-group mb-4">
          <label htmlFor="end_date">
            End Date<span className="form_required">*</span>
          </label>
          <input
            id="end_date"
            type="date"
            onKeyDown={(e) => e.preventDefault()}
            className="form-control"
            placeholder="Enter End Date"
            value={sessionData.end_date}
            onChange={handleInputChange}
          />
          {errors.end_date && <div className="error">{errors.end_date}</div>}
        </div>

        <div className="form-group mb-4">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            className="form-control"
            placeholder=""
            id="description"
            cols={30}
            rows={10}
            value={sessionData.description}
            onChange={handleInputChange}
          />
        </div>
      </CustomModalComponent>

      <ConfirmationModal
        mode="edit"
        show={showConfirmationModal}
        onHide={handleConfirmationModalClose}
        onConfirm={handleConfirm}
        isLoading={isLoading}
        confirmText="Save"
        cancelText="Cancel"
      />

      <DeleteConfirmationModal
        show={showModal}
        onHide={handleModalClose}
        onConfirmDelete={handleConfirmDelete}
        isDeleting={isDeleting}
      />


    </>
  );
};

export default Session;

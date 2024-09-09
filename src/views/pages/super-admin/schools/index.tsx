import CustomModalComponent from "components/CustomModal/creationModal";
import CustomTableComponent from "components/CustomModal/tableModal";
import React, { useEffect, useState } from "react";
import { SchoolTypes } from "types/schoolTypes/types";
import "./style.scss";
// import { CrossIcon, FilterIcon } from "assets";
import { toastError } from "helpers/toastHelper";
import { CrossIcon, FilterIcon } from "assets";


interface TableRow {
    id: string;
    sno: number;
    name: string;
    city: string;
    sub_domain: string;
    contact_person: string;
    contact_number: string;

}

const initialvalues: SchoolTypes.SchoolType = {
    logo_url: "",
    name: "",
    address: "",
    country: "",
    state: "",
    city: "",
    contact_person: "",
    email: "",
    phone: "",
    landline: "",
    school_url: "",
    affiliated_to: "",
    affiliation_number: "",
    sub_domain: "",
    id: undefined,
}

const School = () => {

    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState<TableRow[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const handleCloseFilterModal = () => setShowFilterModal(false);
    const handleShowFilterModal = () => setShowFilterModal(true);
    const [file, setFile] = useState<any>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<{
        logo_url: string;
        name: string;
        address: string;
        country: string;
        state: string;
        city: string;
        contact_person: string;
        email: string;
        phone: string;
        landline: string;
        school_url: string;
        affiliated_to: string;
        affiliation_number: string;
        sub_domain: string;
    }>({
        logo_url: "",
        name: "",
        address: "",
        country: "",
        state: "",
        city: "",
        contact_person: "",
        email: "",
        phone: "",
        landline: "",
        school_url: "",
        affiliated_to: "",
        affiliation_number: "",
        sub_domain: "",
    });

    const [showCreateEditModal, setShowCreateEditModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const [schoolData, setSchoolData] = useState({
        logo_url: "",
        name: "",
        address: "",
        country: "",
        state: "",
        city: "",
        contact_person: "",
        email: "",
        phone: "",
        landline: "",
        school_url: "",
        affiliated_to: "",
        affiliation_number: "",
        sub_domain: "",
    });


    useEffect(() => {
        setTimeout(() => {
            setTableData([
                { id: "1", sno: 1, name: "School 1", city: "Delhi", sub_domain: "school-1", contact_person: "Amit", contact_number: "9870985678" },
                { id: "2", sno: 2, name: "School 2", city: "Gourgaon", sub_domain: "school-2", contact_person: "Ashok", contact_number: "9812780379" },
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    const columns = [
        { header: "S.No", key: "sno" },
        { header: "School Name", key: "name" },
        { header: "Sub Domain", key: "sub_domain" },
        { header: "City", key: "city" },
        { header: "Contact Person", key: "contact_person" },
        { header: "Contact Number", key: "contact_number" },
    ];


    const handleAddNew = () => {
        setIsEditing(false);
        setSchoolData({
            logo_url: "",
            name: "",
            address: "",
            country: "",
            state: "",
            city: "",
            contact_person: "",
            email: "",
            phone: "",
            landline: "",
            school_url: "",
            affiliated_to: "",
            affiliation_number: "",
            sub_domain: "",
        });
        setErrors({
            logo_url: "",
            name: "",
            address: "",
            country: "",
            state: "",
            city: "",
            contact_person: "",
            email: "",
            phone: "",
            landline: "",
            school_url: "",
            affiliated_to: "",
            affiliation_number: "",
            sub_domain: "",
        });
        setShowCreateEditModal(true);
    };


    // handle search logic here //
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleCreateEditModalClose = () => {
        setShowCreateEditModal(false);
    };


    // input value logic here ///
    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     const { id, value } = e.target;
    //     setSchoolData((prevData) => ({ ...prevData, [id]: value }));
    //     setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
    // };

    // submit logic here //
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const {
            logo_url,
            name,
            address,
            country,
            state,
            city,
            contact_person,
            email,
            phone,
            landline,
            school_url,
            affiliated_to,
            affiliation_number,
            sub_domain,
        } = schoolData;

        const newErrors: { [key: string]: string } = {};

        // Example validation logic - you can customize it as needed
        if (!logo_url) newErrors.logo_url = "School logo is required.";
        if (!name) newErrors.name = "School name is required.";
        if (!address) newErrors.address = "Address is required.";
        if (!city) newErrors.city = "City is required.";
        if (!contact_person) newErrors.contact_person = "Contact person is required.";
        if (!email) newErrors.email = "Email is required.";
        if (!phone) newErrors.phone = "Phone number is required.";
        if (!sub_domain) newErrors.sub_domain = "Sub domain is required.";
        if (!country) newErrors.country = "Sub domain is required.";
        if (!state) newErrors.state = "Sub domain is required.";
        if (!landline) newErrors.landline = "Sub domain is required.";
        if (!school_url) newErrors.school_url = "Sub domain is required.";
        if (!affiliated_to) newErrors.affiliated_to = "Sub domain is required.";
        if (!affiliation_number) newErrors.affiliation_number = "Sub domain is required.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setShowConfirmationModal(true);
        }
    };

    // Image File selection logic here //

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            const fileType = file.type;
            if (fileType === "image/jpeg" || fileType === "image/png") {
                setSelectedFile(file);
                // dispatch(uploadFileAsync(file));
            } else {
                toastError(
                    "This file type is not acceptable. Please upload a JPEG or PNG file."
                );
            }
        }
    };

    // Reset Profile logic here //
    const handleResetImage = () => {
        setSelectedFile(null);
    };


    return (
        <>

            <div className={`container ${showConfirmationModal ? 'blur-effect' : ''}`}>
                <div className="inner-section d-flex gap-1 flex-wrap items-center justify-content-between">
                    <div className="left-area">
                        <h6>School List</h6>
                    </div>
                    <div className="right-area">
                        <button className="custom-active-button rounded-lg" onClick={handleAddNew}>
                            Add New School
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
                            placeholder="Search by School Name"
                            value={searchQuery}
                            onChange={handleSearch}
                            className="form-control"
                        />
                    </div>

                    <div className="d-flex align-items-center">
                        <div className="actions-buttons">
                            <span
                                onClick={handleShowFilterModal}
                                className="tooltip-relative"
                            >
                                <img src={FilterIcon} alt="Filter Icon" />
                                <span className="tooltip">Filter</span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* TABLE COMPONENT HERE  */}
                <CustomTableComponent
                    columns={columns}
                    data={tableData}
                    loading={loading}
                    //   onEdit={handleEdit}
                    //   onDelete={handleModalOpen} 
                    emptyMessage="No school available"
                />




                <CustomModalComponent
                    show={showCreateEditModal}
                    onClose={handleCreateEditModalClose}
                    title={isEditing ? "Update School" : "Create New School"}
                    isEditing={isEditing}
                    onSubmit={handleFormSubmit}
                    buttonText={isEditing ? "Update" : "Save"}
                // className={showConfirmationModal ? 'blur-effect' : ''}
                >

                    <div className="col-12 col-lg-12">
                        <div className="form-group mb-4">
                            <label htmlFor="file-upload">School Logo</label>
                            <div className="profile-picture position-relative">
                                <label htmlFor="file-upload" className="custom-file-upload">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg"
                                        className="default-avatar"
                                        alt=""
                                    />
                                    <img
                                        src={
                                            selectedFile
                                                ? URL.createObjectURL(selectedFile)
                                                : schoolData?.logo_url || file
                                        }
                                        className="uploaded-avatar"
                                    />
                                </label>
                                {schoolData?.logo_url && (
                                    <div
                                        className="remove-logo-icon"
                                        onClick={handleResetImage}
                                    >
                                        <img src={CrossIcon} alt="remove-logo" />
                                        <span>Remove Profile Image</span>
                                    </div>
                                )}

                                <input
                                    id="logo_url"
                                    type="file"
                                    accept=".jpeg, .png"
                                    className=""
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-4">
                        <div className="form-group mb-4">
                            <label htmlFor="">
                                School Name<span className="form_required">*</span>
                            </label>
                            <input
                                id="name"
                                type="text"
                                className="form-control"
                                placeholder="Enter school name"
                                value={schoolData?.name}
                            // onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="col-12 col-lg-4">
                        <div className="form-group mb-4">
                            <label htmlFor="">
                                School Address<span className="form_required">*</span>
                            </label>
                            <textarea
                                id="address"
                                name="address"
                                className="form-control"
                                placeholder="Enter school address"
                                value={schoolData?.address}
                            // onChange={handleChange}
                            ></textarea>

                        </div>
                    </div>

                    <div className="col-12 col-lg-4">
                        <div className="form-group mb-4">
                            <label htmlFor="">
                                Country<span className="form_required">*</span>
                            </label>
                            <input
                                id="country"
                                type="text"
                                className="form-control"
                                placeholder="Enter country"
                                value={schoolData?.country}
                            // onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="col-12 col-lg-4">
                        <div className="form-group mb-4">
                            <label htmlFor="">
                                State<span className="form_required">*</span>
                            </label>
                            <input
                                id="state"
                                type="text"
                                className="form-control"
                                placeholder="Enter state"
                                value={schoolData?.state}
                            // onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="col-12 col-lg-4">
                        <div className="form-group mb-4">
                            <label htmlFor="">
                                City<span className="form_required">*</span>
                            </label>
                            <input
                                id="city"
                                type="text"
                                className="form-control"
                                placeholder="Enter city"
                                value={schoolData?.city}
                            // onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="col-12 col-lg-4">
                        <div className="form-group mb-4">
                            <label htmlFor="">
                                Contact Person<span className="form_required">*</span>
                            </label>
                            <input
                                id="contact_person"
                                type="text"
                                className="form-control"
                                placeholder="Enter contact person"
                                value={schoolData?.contact_person}
                            // onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="col-12 col-lg-4">
                        <div className="form-group mb-4">
                            <label htmlFor="">
                                Email Id<span className="form_required">*</span>
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                placeholder="Enter email id"
                                value={schoolData?.email}
                            // onChange={handleChange}
                            />

                        </div>
                    </div>

                    <div className="col-12 col-lg-4">
                        <div className="form-group mb-4">
                            <label htmlFor="phone">
                                Contact Number<span className="form_required">*</span>
                            </label>
                            <input
                                id="phone"
                                type="text"
                                className="form-control no-arrows"
                                placeholder="Enter contact number"
                                value={schoolData?.phone}
                                // onChange={(e) => {
                                //     const newValue = e.target.value;
                                //     if (/^\d*$/.test(newValue) && newValue.length <= 10) {
                                //         handleChange(e);
                                //     }
                                // }}
                                maxLength={10}
                            />

                        </div>
                    </div>

                    <div className="col-12 col-lg-4">
                        <div className="form-group mb-4">
                            <label htmlFor="">
                                Sub Domain<span className="form_required">*</span>
                            </label>
                            <input
                                id="sub_domain"
                                type="text"
                                className="form-control"
                                placeholder="Enter sub domain"
                                value={schoolData?.sub_domain}
                            // onChange={handleChange}
                            />

                        </div>
                    </div>

                    <div className="col-12 col-lg-4">
                        <div className="form-group mb-4">
                            <label htmlFor="">Landline</label>
                            <input
                                id="landline"
                                type="text"
                                className="form-control no-arrows"
                                placeholder="Enter landline number"
                                value={schoolData?.landline}
                            // onChange={(e) => {
                            //     const filtered = e.target.value.replace(/[^0-9]/g, "");
                            //     handleChange(e);
                            // }}
                            />
                        </div>
                    </div>

                    <div className="col-12 col-lg-4">
                        <div className="form-group mb-4">
                            <label htmlFor="">School URL</label>
                            <input
                                id="school_url"
                                type="text"
                                className="form-control"
                                placeholder="Enter school url"
                                value={schoolData?.school_url}
                            // onChange={handleChange}
                            />
                        </div>
                    </div>

                </CustomModalComponent>
            </div>
        </>
    );
};

export default School;

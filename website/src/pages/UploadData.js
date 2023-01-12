import React, { useState, useEffect } from 'react';
import PORT from "../conn";

// Import components
import toast from 'react-hot-toast';
import { Title } from '../components/Title/Title';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { BiFolderOpen } from "react-icons/bi";

// Import style
import "../components/Settings/Settings.css"

function UploadData() {
  // States
  const [showStudentFile, setShowStudentFile] = useState(false); // input modal show
  const [showCompanyFile, setShowCompanyFile] = useState(false); // input modal show
  const [isDisabled, setDisabled] = useState(true); // save changes

  // Init form data to store files
  const [formData, setFormData] = useState(new FormData())

  // Init states for files
  const [studentFile, setStudentFile] = useState({
    file: null,
    name: '',
    size: '',
    type: '',
  });

  const [companyFile, setCompanyFile] = useState({
    file: null,
    name: '',
    size: '',
    type: '',
  });

  const handleFileChange = (event) => {
    setFormData(formData.append('file', event.target.files[0]))
    console.log(formData.getAll('file'))
  }

  // Student file show/hide handler +
  // Student file text update
  const handleStudentClick = () => setShowStudentFile(true);
  const handleCloseStudentFile = () => {
    setShowStudentFile(false);
  };

  // Company file show/hide handler +
  // Company file text update
  const handleCompanyClick = () => setShowCompanyFile(true);
  const handleCloseCompanyFile = () => {
    setShowCompanyFile(false);
  };

  const handleConfirmStudentFile = () => {
    handleFileChange()
  }

  const handleConfirmCompanyFile = () => {
    handleFileChange()
  }

  // Toast, reset states, upsert data
  function handleSave() {
    setStudentFile(null);
    setCompanyFile(null);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formData,
      redirect: 'follow'
    };

    fetch(PORT + "/api/v1/settings", requestOptions)
      .then(response => response.text())
      .then(result => toast.success("Successfully Updated Settings"))
      .catch(error => toast.error("Failed Updating Settings"));
  }

  // Disabled state 
  useEffect(() => {
    const handleDisabledSave = () => {
      if (formData.getAll('file').length === 0) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    }
    handleDisabledSave();
  }, [studentFile.file, companyFile.file]);

  return (
    <div style={{ paddingTop: "80px", paddingLeft: "50px", textAlign: "initial" }} className="container-fluid m-0">
      <div className="row">
        {/* Title */}
        <div className="col">
          <Title>Upload Data</Title>
          <p>Upload the corresponding excel files for the current semester here.</p>
        </div>

        {/* Save Changes */}
        <div className="col justify-content-center align-self-center" style={{ textAlign: "end", paddingRight: "50px" }}>
          <Button id="save-btn" variant="dark" style={{ padding: "15px 30px" }} disabled={isDisabled} onClick={handleSave}>SAVE CHANGES</Button>
        </div>
      </div>
      <hr />

      {/* Student's Data */}
      <h2 id="student-file-header" style={{ paddingTop: "20px", fontFamily: "var(--secondary-font)", fontSize: "20px" }}>Student's Data</h2>
      <hr />
      <div className="container-fluid m-0" >
        <div className="row">
          {/* Text */}
          <Card body className="col-9" style={{ fontSize: "20px" }}>
            <BiFolderOpen /> {studentFile.file}
          </Card>

          {/* Button to Upload */}
          <div className="col-2 justify-content-center align-self-center">
            <Button variant="dark" style={{ padding: "15px", width: "-webkit-fill-available" }} onClick={handleStudentClick}>UPLOAD FILE</Button>
          </div>
        </div>
      </div>

      {/* Company's Data */}
      <h2 id="company-file-header" style={{ paddingTop: "20px", fontFamily: "var(--secondary-font)", fontSize: "20px" }}>Company's Data</h2>
      <hr />
      <div className="container-fluid m-0" style={{paddingBottom:"100px"}}>
        <div className="row">
          {/* Text */}
          <Card body className="col-9" style={{ fontSize: "20px" }}>
            <BiFolderOpen /> {companyFile.file}
          </Card>

          {/* Button to Upload */}
          <div className="col-2 justify-content-center align-self-center">
            <Button variant="dark" style={{ padding: "15px", width: "-webkit-fill-available" }} onClick={handleCompanyClick}>UPLOAD FILE</Button>
          </div>
        </div>
      </div>

      {/* Student directory modal */}
      <Modal show={showStudentFile} onHide={handleCloseStudentFile}>
        {/* Header with close button */}
        <Modal.Header closeButton>
          <Modal.Title>Choose file to upload</Modal.Title>
        </Modal.Header>

        {/* Body with input */}
        <Modal.Body>
          <input type="file" defaultValue={studentFile.file} onChange={handleFileChange}/>
        </Modal.Body>

        {/* Confirm selection button */}
        <Modal.Footer>
          <Button variant="primary" onClick={handleConfirmStudentFile}>
            CONFIRM
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Company directory modal */}
      <Modal show={showCompanyFile} onHide={handleCloseCompanyFile}>
        {/* Header with close button */}
        <Modal.Header closeButton>
          <Modal.Title>Choose file to upload</Modal.Title>
        </Modal.Header>

        {/* Body with input */}
        <Modal.Body>
          <input type="file" defaultValue={companyFile.file} onChange={handleFileChange}/>
        </Modal.Body>

        {/* Confirm selection button */}
        <Modal.Footer>
          <Button variant="primary" onClick={handleConfirmCompanyFile}>
            CONFIRM
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default UploadData
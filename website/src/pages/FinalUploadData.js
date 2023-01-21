import React, { useState, useEffect } from 'react';
import PORT from "../conn";

// Import components
import toast from 'react-hot-toast';
import { Title } from '../components/Title/Title';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { BiFolderOpen } from "react-icons/bi";
import axios, { Axios } from 'axios';

// Import style
import "../components/Settings/Settings.css"

function UploadData() {
  // States
  const [showStudentFile, setShowStudentFile] = useState(false); // input modal show
  const [showCompanyFile, setShowCompanyFile] = useState(false); // input modal show
  const [isDisabled, setDisabled] = useState(true); // save changes

  // Lincoln file file 
  const [studentFile, setStudentFile] = useState(null);
  const [companyFile, setCompanyFile] = useState(null);

  //lincoln upload function
  const uploadStudentFile=(e)=>{
    e.preventDefault()
    let studentformData =new FormData();
    studentformData.append("student",studentFile);
    setStudentFileName(studentFile.name)
    axios.post(PORT + "/api/v1/students/upload",studentformData)
    handleCloseStudentFile();
  }
  const uploadCompanyFile=(e)=>{
    e.preventDefault()
    let companyformData =new FormData();
    companyformData.append("company",companyFile);
    setCompanyFileName(companyFile.name)
    axios.post(PORT + "/api/v1/companies/upload",companyformData)
    handleCloseCompanyFile();
  }

  const [studentFileName, setStudentFileName] = useState("");
  const [companyFileName, setCompanyFileName] = useState("");

  const [data, setData] = useState(null);
  const [internshipPeriod, setInternshipPeriod] = useState(null);

  // get internship period to display
  React.useEffect(() => {
    fetch(PORT + "/api/v1/settings")
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.length > 0) {
          setData(data);
          const internshipPeriod = data.filter(
            (setting) => setting.setting_type === "INTERNSHIP_PERIOD"
          )[0].setting_value;
          setInternshipPeriod(internshipPeriod);
        }
      })
      .catch((error) => console.log(error));
  }, []);


  // Student file show/hide handler +
  // Student file text update
  const handleStudentClick = () => {
    setShowStudentFile(true);
    setStudentFileName("");
  };

  const handleCloseStudentFile = () => {
    setShowStudentFile(false);
  };

  // Company file show/hide handler +
  // Company file text update
  const handleCompanyClick = () => {
    setShowCompanyFile(true);
    setCompanyFileName("");
  };
  const handleCloseCompanyFile = () => {
    setShowCompanyFile(false);
  };

  return (
    <div
      style={{ paddingTop: "80px", paddingLeft: "50px", textAlign: "initial" }}
      className="container-fluid m-0"
    >
      <div className="row">
        {/* Title */}
        <div className="col">
          <Title>Upload Data</Title>
          <p>
            Upload the corresponding excel files for the current semester here.
          </p>
          <div className="row">
            <p>Internship Period: </p>
            <b>{internshipPeriod}</b>
          </div>
        </div>

        {/* Save Changes
        <div className="col justify-content-center align-self-center" style={{ textAlign: "end", paddingRight: "50px" }}>
          <Button id="save-btn" variant="dark" style={{ padding: "15px 30px" }} disabled={isDisabled} onClick={handleSave}>SAVE CHANGES</Button>
        </div> */}
      </div>
      <hr />

      {/* Student's Data */}
      <h2
        id="student-file-header"
        style={{
          paddingTop: "20px",
          fontFamily: "var(--secondary-font)",
          fontSize: "20px",
        }}
      >
        Student's Data
      </h2>
      <hr />
      <div className="container-fluid m-0">
        <div className="row">
          {/* Text */}
          <Card body className="col-9" style={{ fontSize: "20px" }}>
            <BiFolderOpen /> {studentFileName}
          </Card>

          {/* Button to Upload */}
          <div className="col-2 justify-content-center align-self-center">
            <Button
              variant="dark"
              style={{ padding: "15px", width: "-webkit-fill-available" }}
              onClick={handleStudentClick}
            >
              UPLOAD FILE
            </Button>
          </div>
        </div>
      </div>

      {/* Company's Data */}
      <h2
        id="company-file-header"
        style={{
          paddingTop: "20px",
          fontFamily: "var(--secondary-font)",
          fontSize: "20px",
        }}
      >
        Company's Data
      </h2>
      <hr />
      <div className="container-fluid m-0" style={{ paddingBottom: "100px" }}>
        <div className="row">
          {/* Text */}
          <Card body className="col-9" style={{ fontSize: "20px" }}>
            <BiFolderOpen /> {companyFileName}
          </Card>

          {/* Button to Upload */}
          <div className="col-2 justify-content-center align-self-center">
            <Button
              variant="dark"
              style={{ padding: "15px", width: "-webkit-fill-available" }}
              onClick={handleCompanyClick}
            >
              UPLOAD FILE
            </Button>
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
          <input
            id="StudentUploadFile"
            formEncType='multipart/form-data; boundary=----WebKitFormBoundaryGVn59QTi5BpftPIp'
            type="file"
            name="student"
            defaultValue={studentFileName}
            onChange={(e) => {
              setStudentFile(e.target.files[0])
            }}
          />
        </Modal.Body>

        {/* Confirm selection button */}
        <Modal.Footer>
          <Button variant="primary" onClick={(e)=>uploadStudentFile(e)}>
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
          <input
            id="CompanyUploadFile"
            formEncType='multipart/form-data'
            type="file"
            name="company"
            defaultValue={companyFileName}
            onChange={(e) => {
              setCompanyFile(e.target.files[0])
            }}
          />
        </Modal.Body>

        {/* Confirm selection button */}
        <Modal.Footer>
          <Button variant="primary" onClick={(e)=>uploadCompanyFile(e)}>
            CONFIRM
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UploadData
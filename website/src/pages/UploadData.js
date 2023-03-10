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

  // Init form data to store files
  const [studentFormData, setStudentFormData] = useState(new FormData());
  const [companyFormData, setCompanyFormData] = useState(new FormData());

  // Lincoln file file 
  const [lincolnFile, setLincolnFile] = useState(null);

  //lincoln upload function
  const upload=(e)=>{
    e.preventDefault()
    let formData =new FormData();
    formData.append("student",lincolnFile);
    axios.post(PORT + "/api/v1/students/upload",formData)
  }

  // file change when user selects file
  const handleStudentFileChange = (event) => {
    console.log(event.target.files[0].name)
    studentFormData.append("student", event.target.files[0],event.target.files[0].name);
    setStudentFormData(studentFormData);
    // setStudentFileName(event.target.files[0].name);
  };

  const handleCompanyFileChange = (event, key) => {
    companyFormData.append(key, event);
    setCompanyFormData(companyFormData);
    setCompanyFileName(event.name);
    handleCompanySave();
    handleCloseCompanyFile();
  };

  const [studentFileName, setStudentFileName] = useState("File Directory");
  const [companyFileName, setCompanyFileName] = useState("File Directory");

  // file inputs
  const studentFileInput = React.createRef();
  const companyFileInput = React.createRef();

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

  const handleConfirmStudentFile = (event) => {
    handleStudentSave();
    handleCloseStudentFile();
   // handleStudentFileChange(input.files[0], "student-file");
  };

  const handleConfirmCompanyFile = (event) => {
    var input = document.getElementById("CompanyUploadFile");
    console.log(input.files[0]);
    handleCompanyFileChange(input.files[0], "company-file");
  };

  // Student file show/hide handler +
  // Student file text update
  const handleStudentClick = () => {
    setShowStudentFile(true);
    setStudentFileName("");
    setStudentFormData(new FormData());
  };

  const handleCloseStudentFile = () => {
    setShowStudentFile(false);
  };

  // Company file show/hide handler +
  // Company file text update
  const handleCompanyClick = () => {
    setShowCompanyFile(true);
    setCompanyFileName("");
    setCompanyFormData(new FormData());
  };
  const handleCloseCompanyFile = () => {
    setShowCompanyFile(false);
  };

  async function handleStudentSave() {
    // const studentRequestOptions = {
    //   method: "POST",
    //   body: studentFormData,
    //   headers: {
    //     "Content-Type": "multipart/form-data;",
    //   },  
    //    redirect: "follow",
    // };

    // upload student data
    // fetch(PORT + "/api/v1/students/upload", studentRequestOptions)
    //   .then((response) => response.text())
    //   .then((result) => toast.success("Success updating student data"))
    //   .catch((error) => toast.error("Failed updating student data"));

    var string = `${PORT}/api/v1/students`;
    string = string.toString()
    console.log(string)

    if (typeof string === 'string') { 
      console.log(`${PORT}`+'/api/v1/students' )
     }
     else{
      console.log("no")
     }
      try {
        const response = await axios.post("http://localhost:5222/api/v1/students", studentFormData, {
          headers: {
          'Content-Type': 'multipart/form-data'
          },
          });
          console.log(response.data);
      } catch (error) {
          console.error(error);
      }
  }

  async function handleCompanySave() {
    var companyRequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: companyFormData,
      redirect: "follow",
    };

    // upload company data
    fetch(PORT + "/api/v1/companies/upload", companyRequestOptions)
      .then((response) => response.text())
      .then((result) => toast.success("Success updating company data"))
      .catch((error) => toast.error("Failed updating company data"));
  }

  // // Disabled state
  // useEffect(() => {
  //   const handleDisabledSave = () => {
  //     if (formData.getAll('file').length === 0) {
  //       setDisabled(true);
  //     } else {
  //       setDisabled(false);
  //     }
  //   }
  //   handleDisabledSave();
  // }, [studentFile.file, companyFile.file]);

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
          <p id='internship-header'>
            Internship Period: {internshipPeriod ? internshipPeriod : "Not set"}
          </p>
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
              setLincolnFile(e.target.files[0])
            }}
          />
        </Modal.Body>

        {/* Confirm selection button */}
        <Modal.Footer>
          <Button variant="primary" onClick={(e)=>upload(e)}>
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
            name="company-file"
            defaultValue={companyFileName}
            ref={companyFileInput}
          />
        </Modal.Body>

        {/* Confirm selection button */}
        <Modal.Footer>
          <Button variant="primary" onClick={handleConfirmCompanyFile}>
            CONFIRM
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UploadData
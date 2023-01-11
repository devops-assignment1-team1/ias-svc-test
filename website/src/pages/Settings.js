import React, { useState, useEffect } from 'react';
import PORT from "../conn";

// Import components
import toast from 'react-hot-toast';
import { Calendar } from "react-multi-date-picker";
import { Title } from '../components/Title/Title';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { 
    BiFolderOpen ,
    BiCalendar
} from "react-icons/bi";

// Import style
import "../components/Settings/Settings.css"

function Settings() {
    // States
    const [show, setShow] = useState(false); // date picker modal show
    const [showEmailDir, setShowEmailDir] = useState(false); // input modal show
    const [showResumeDir, setShowResumeDir] = useState(false); // input modal show
    const [value, setValue] = useState(new Date()); // date value
    const [isDisabled, setDisabled] = useState(true); // save changes

    // Init states for texts
    const [internshipPeriod , setInternshipPeriod] = useState("DD/MM/YYYY - DD/MM/YYYY");
    const [emailPath, setEmailPath] = useState("File Directory");
    const [resumePath, setResumePath] = useState("File Directory");

    // Internship period modal show/hide handler +
    // Internship Period text update
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);

        if(value.length === 2){
            const start = value[0];
            const end = value[1];
            
            // Start date
            const dayStart = String(start.day).length === 1 ? "0" + String(start.day) : String(start.day);
            const monthStart = String(start.month.index + 1).length === 1 ? "0" + String(start.month.index + 1) : String(start.month.index + 1);
            const startStr = dayStart + "/" + monthStart + "/" + String(start.year);

            // End date
            const dayEnd = String(end.day).length === 1 ? "0" + String(end.day) : String(end.day);
            const monthEnd = String(end.month.index + 1).length === 1 ? "0" + String(end.month.index + 1) : String(end.month.index + 1);
            const endStr = dayEnd + "/" + monthEnd + "/" + String(end.year);
            setInternshipPeriod(startStr + " - " + endStr);
        };
    };

    // Email directory show/hide handler +
    // Email directory  text update
    const handleEmailClick = () => setShowEmailDir(true);
    const handleCloseEmailDir = () => {
        setShowEmailDir(false);
        setEmailPath(document.getElementById("email-dir").value);
    };

    // Resume directory show/hide handler +
    // Resume directory  text update
    const handleResumeClick = () => setShowResumeDir(true);
    const handleCloseResumeDir = () => {
        setShowResumeDir(false);
        setResumePath(document.getElementById("resume-dir").value);
    };

    // Toast, reset states, upsert data
    function handleSave(){
        setInternshipPeriod("DD/MM/YYYY - DD/MM/YYYY");
        setEmailPath("File Directory");
        setResumePath("File Directory");

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "email_dir": emailPath,
          "resume_dir": resumePath,
          "internship_period": internshipPeriod
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch(PORT + "/api/v1/settings", requestOptions)
          .then(response => response.text())
          .then(result => toast.success("Successfully Updated Settings"))
          .catch(error => toast.error("Failes Updating Settings"));
    }

    // Disabled state 
    useEffect(() => {
        const handleDisabledSave = () => {
            if(internshipPeriod === "DD/MM/YYYY - DD/MM/YYYY" || internshipPeriod === "" ||
                emailPath === "File Directory" || emailPath === "" || 
                resumePath === "File Directory" || resumePath === ""){
                    setDisabled(true);
            }else{
                setDisabled(false);
            }
        }
        handleDisabledSave();
    }, [internshipPeriod, emailPath, resumePath]);

    return (
        <div style={{paddingTop:"80px",paddingLeft:"50px",textAlign:"initial"}} className="container-fluid m-0">
            <div className="row">
                {/* Title */}
                <div className="col">
                    <Title>Settings</Title>
                    <p>Make changes to file directories of emails and resumes.</p>
                </div>

                {/* Save Changes */}
                <div className="col justify-content-center align-self-center" style={{textAlign:"end", paddingRight:"50px" }}>
                    <Button id="save-btn" variant="dark" style={{padding:"15px 30px"}} disabled={isDisabled} onClick={handleSave}>SAVE CHANGES</Button>
                </div>
            </div>
            <hr />

            {/* Email directory */}
            <h2 id="email-dir-header" style={{paddingTop:"20px" ,fontFamily: "var(--secondary-font)", fontSize: "20px"}}>Email Directory</h2>
            <hr />
            <div className="container-fluid m-0" >
                <div className="row">
                    {/* Text */}
                    <Card body className="col-9" style={{fontSize:"20px"}}>
                        <BiFolderOpen/> {emailPath}
                    </Card>
                    
                    {/* Button to Upload */}
                    <div className="col-2 justify-content-center align-self-center">
                        <Button variant="dark" style={{padding:"15px", width:"-webkit-fill-available"}} onClick={handleEmailClick}>UPDATE DIRECTORY</Button>
                    </div>
                </div>
            </div>

            {/* Resume directory */}
            <h2 id="resume-dir-header" style={{paddingTop:"20px" ,fontFamily: "var(--secondary-font)", fontSize: "20px"}}>Resume Directory</h2>
            <hr />
            <div className="container-fluid m-0">
                <div className="row">
                    {/* Text */}
                    <Card body className="col-9" style={{fontSize:"20px"}}>
                        <BiFolderOpen/> {resumePath}
                    </Card>
                    
                    {/* Button to Upload */}
                    <div className="col-2 justify-content-center align-self-center">
                        <Button variant="dark" style={{padding:"15px", width:"-webkit-fill-available"}} onClick={handleResumeClick}>UPDATE DIRECTORY</Button>
                    </div>
                </div>
            </div>

            {/* Internship period */}
            <h2 id="internship-header" style={{paddingTop:"20px" ,fontFamily: "var(--secondary-font)", fontSize: "20px"}}>Internship Period</h2>
            <hr />
            <div className="container-fluid m-0" style={{paddingBottom:"100px"}}>
                <div className="row">
                    {/* Text */}
                    <Card body className="col-9" style={{fontSize:"20px"}} id="internship-period-text">
                        <BiCalendar/> {internshipPeriod}
                    </Card>
                    
                    {/* Button to Upload */}
                    <div className="col-2 justify-content-center align-self-center">
                        <Button onClick={handleShow} variant="dark" style={{padding:"15px", width:"-webkit-fill-available"}}>UPDATE PERIOD</Button>
                    </div>  
                </div>
            </div>

            {/* Internship period date picker modal */}
            <Modal show={show} onHide={handleClose}>
                {/* Header with close button */}
                <Modal.Header closeButton>
                    <Modal.Title>Select Internship Date Range</Modal.Title>
                </Modal.Header>

                {/* Body with date picker */}
                <Modal.Body>
                    <Calendar range minDate={new Date()} numberOfMonths={2} value={value} onChange={setValue}/>
                </Modal.Body>

                {/* Confirm selection button */}
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        CONFIRM
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Email directory modal */}
            <Modal show={showEmailDir} onHide={handleCloseEmailDir}>
                {/* Header with close button */}
                <Modal.Header closeButton>
                    <Modal.Title>Enter Directory</Modal.Title>
                </Modal.Header>

                {/* Body with input */}
                <Modal.Body>
                    <Form.Control
                        type="text"
                        id = "email-dir"
                    />
                </Modal.Body>

                {/* Confirm selection button */}
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseEmailDir}>
                        CONFIRM
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Resume directory modal */}
            <Modal show={showResumeDir} onHide={handleCloseResumeDir}>
                {/* Header with close button */}
                <Modal.Header closeButton>
                    <Modal.Title>Enter Directory</Modal.Title>
                </Modal.Header>

                {/* Body with input */}
                <Modal.Body>
                    <Form.Control
                        type="text"
                        id = "resume-dir"
                    />
                </Modal.Body>

                {/* Confirm selection button */}
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseResumeDir}>
                        CONFIRM
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
  )
}

export default Settings
import React from 'react'

// Import components
import { Title } from '../components/Title/Title'
import Button from 'react-bootstrap/Button';
import "../components/Main/Main.css"

function main() {
  return (
    <div style={{paddingTop:"180px",textAlign:"initial"}} className="container-fluid m-0 bg">
      <div className="row content" style={{paddingLeft:"50px", paddingBottom:"80px"}}>
        {/* Title */}
        <div className="col">
            <Title>Easy Student Internship <br/> Management</Title>
            <p>One-stop application to manage all internship matters.</p>
        </div>
      </div>
      <div className="row content">
        {/* Upload File */}
        <div className="col-3" style={{border:"1px solid black", padding:"50px"}}>
          <p style={{textAlign:"center"}}>Upload current internship data in excel format for internship students and companies.</p>
          <Button variant='dark' style={{padding:"15px", width:"100%"}} href="/Upload_Data">UPLOAD FILE</Button>
        </div>

        {/* Match Student */}
        <div className="col-3" style={{border:"1px solid black", padding:"50px"}}>
          <p style={{textAlign:"center"}}>Match students to their prospective companies and manage their status of internship.</p>
          <Button variant='dark' style={{padding:"15px", width:"100%"}} href="/Match_Student">MATCH STUDENT</Button>
        </div>

        {/* Prepare Emails */}
        <div className="col-3" style={{border:"1px solid black", padding:"50px"}}>
          <p style={{textAlign:"center"}}>Prepare emails for students attached to their prospective companies with their resumes.</p>
          <Button variant='dark' style={{padding:"15px", width:"100%"}} href="/Prepare_Email">PREPARE EMAILS</Button>
        </div>

        {/* Settings */}
        <div className="col-3" style={{border:"1px solid black", padding:"50px"}}>
          <p style={{textAlign:"center"}}>Make changes to the file directories of emails , resumes and semester date range.</p>
          <Button variant='dark' style={{padding:"15px", width:"100%"}} href="/Settings">SETTINGS</Button>
        </div>
      </div>
    </div>
  )
}

export default main
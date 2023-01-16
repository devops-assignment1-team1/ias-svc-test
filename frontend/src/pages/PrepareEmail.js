import React from 'react'

// Import components
import { Title } from '../components/Title/Title'

function prepareEmail() {
  return (
    <div style={{paddingTop:"80px",paddingLeft:"50px",textAlign:"initial"}} className="container-fluid m-0">
        <div className="row">
            {/* Title */}
            <div className="col">
                <Title>Prepare Emails</Title>
                <p>Manage emails to companies for students here. Select a student to download a CSV file, or prepare their email.</p>
            </div>
        </div>
        <hr />
    </div>
  )
}

export default prepareEmail
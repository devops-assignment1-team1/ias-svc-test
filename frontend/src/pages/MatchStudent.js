import React from 'react'

// Import components
import { Title } from '../components/Title/Title'

function matchStudent() {
  return (
    <div style={{paddingTop:"80px",paddingLeft:"50px",textAlign:"initial"}} className="container-fluid m-0">
        <div className="row">
            {/* Title */}
            <div className="col">
                <Title>Match Students</Title>
                <p>Match students to companies and update their status here.</p>
            </div>
        </div>
        <hr />
    </div>
  )
}

export default matchStudent
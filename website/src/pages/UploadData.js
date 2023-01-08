import React from 'react'

// Import components
import { Title } from '../components/Title/Title'

function uploadData() {
  return (
    <div style={{paddingTop:"80px",paddingLeft:"50px",textAlign:"initial"}} className="container-fluid m-0">
        <div className="row">
            {/* Title */}
            <div className="col">
                <Title>Upload Data</Title>
                <p>Upload the corresponding excel files for the current semester here.</p>
            </div>
        </div>
        <hr />
    </div>
  )
}

export default uploadData
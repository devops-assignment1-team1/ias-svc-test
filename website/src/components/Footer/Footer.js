import React from 'react'

function Footer() {

    const year = new Date().getFullYear();

    return (
        <div id="footer" style={{textAlign:"center", background:"#212529" , color:"#fff", padding: "15px"}}>IAS {year}</div>
    )
}

export default Footer
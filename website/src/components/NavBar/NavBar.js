import React from 'react'

// Import components
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { 
  BiUpload,
  BiGroup,
  BiMailSend,
  BiCog
} from "react-icons/bi";

// Import style
import "./NavBar.css"

function NavBar() {
  return (
    <div>
        <Navbar bg="dark" variant="dark" fixed="top">
            <Container style={{padding:0,paddingLeft:"50px"}} fluid>
                <Navbar.Brand href="/Main" style={{fontSize:"30px"}}>IAS</Navbar.Brand>
                    <Nav className="justify-content-end" style={{padding:0,paddingRight:"50px"}}>
                        <Nav.Link href="/Upload_Data"> <BiUpload/> UPLOAD</Nav.Link>
                        <Nav.Link href="/Match_Student"><BiGroup/> MATCH STUDENTS</Nav.Link>
                        <Nav.Link href="/Prepare_Email"><BiMailSend/> PREPARE EMAILS</Nav.Link>
                        <Nav.Link href="/Settings"><BiCog/> SETTINGS</Nav.Link>
                    </Nav>
            </Container>
        </Navbar>
    </div>
  )
}

export default NavBar
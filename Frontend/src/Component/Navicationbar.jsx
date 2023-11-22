import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navicationbar() {
    const handleChange = () => {
        window.localStorage.clear()
        window.location.reload(false)


    }
    const userrole = window.localStorage.getItem("userLoggedIn")
    const adminrole = window.localStorage.getItem("adminLoggedIn")
    const sadminrole = window.localStorage.getItem("sAdminLoggedIn")

    return (
        <Navbar collapseOnSelect expand="lg" className='navbarcolor'>
            <Container>
                {userrole == undefined ?
                    <>
                        <Navbar.Brand>Society Management</Navbar.Brand>
                    </> : <></>}

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {userrole ?
                            <>
                                <Navbar.Brand href="/">Society Management</Navbar.Brand>
                                <Nav.Link href="/profile">Profile</Nav.Link>
                                <Nav.Link href="/bills" >Bills</Nav.Link>
                            </>
                            :
                            <></>
                        }
                        {
                            adminrole && userrole ==undefined && sadminrole==undefined ?
                                <>

                                    <Nav.Link href="/societydetails">Society Details</Nav.Link>
                                    <Nav.Link href="/addadmin">AddAdmin</Nav.Link>
                                </>
                                :
                                <></>
                        }
                        {
                            sadminrole && userrole==undefined && adminrole==undefined?
                                <>
                                    {/* <Nav.Link href="/adminportal">Dashboard</Nav.Link> */}
                                <Nav.Link href="/societydetails/membersdetails">MembersDetails</Nav.Link>
                                </>
                                :
                                <></>
                        }

                    </Nav>
                    <Nav>
                        {userrole || adminrole || sadminrole ?
                            <> <Nav.Link onClick={handleChange}>Logout</Nav.Link></>
                            :
                            <>
                                <Nav.Link href="/login">Login</Nav.Link>
                                <Nav.Link href="/register">Register</Nav.Link>
                            </>
                        }

                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navicationbar;
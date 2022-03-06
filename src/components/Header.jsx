import { Navbar, Nav, Container, NavDropdown} from "react-bootstrap";
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

function Header()
{
  const navigate = useNavigate()
  let user = JSON.parse(localStorage.getItem("user-info"))
  function logOut()
  {
    localStorage.clear();
    navigate('/login')
  }
    return(
        <div>
            <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="/main">Viblo</Navbar.Brand>
    <Nav className="me-auto">
      {
        localStorage.getItem('user-info') ?
        <>
          <Nav.Link href="/addpost">Write a post</Nav.Link>
          <Nav.Link href="/bookmark">Bookmark</Nav.Link>
        </>
      :
        <>
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/register">Register</Nav.Link>
        </>
      }
      </Nav>
      {localStorage.getItem('user-info') ?
      <Nav>
        <NavDropdown title={user && user.name} >
          <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      :null}
    </Container>
  </Navbar>
        </div>
    )
}

export default Header
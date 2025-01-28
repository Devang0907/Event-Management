import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function NavigationMenu() {

    const navigate=useNavigate();

    function onClickHandler(){
       navigate('/create')
    }

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Event Manager</Navbar.Brand>
        <Nav className="ms-auto">
          <Button variant="light" onClick={onClickHandler}>Create</Button>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavigationMenu;

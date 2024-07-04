import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import reactIcon from '../assets/images/react.svg'

export default function Header(){
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href={import.meta.env.VITE_REPO_NAME}>
          <img
            alt="ReactJS logo"
            src={reactIcon}
            width="30"
            height="30"
            className="align-top"
          />{' '}
          Repository Directory
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}
import Spinner from 'react-bootstrap/Spinner';

const Loader = ({ text }) => {
  return (
    <div className="d-flex justify-content-center text-muted my-3">
      <div>
        <Spinner animation="border" role="status" size='sm' as='span' className="align-bottom pt-2"/>
      </div>
      <span className="ms-3 pt-1">{text}</span>
    </div>
  )
}

export default Loader
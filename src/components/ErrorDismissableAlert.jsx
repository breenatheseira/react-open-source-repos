import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

export default function ErrorDismissableAlert({ message }){
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert 
        className='my-3'
        variant="danger" 
        onClose={() => setShow(false)}
        dismissible
      >
        <p className='mb-0'>{ message }</p>
      </Alert>
    );
  }
}
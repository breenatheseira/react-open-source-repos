import Accordion from 'react-bootstrap/Accordion';
import Badge from 'react-bootstrap/Badge';

import eyeIcon from '../../assets/eye.svg'
import starIcon from '../../assets/star.svg'
import forkIcon from '../../assets/fork.svg'

const BadgeStat = ({ stat, icon, text }) => {

  return (
    <Badge
      bg="light" 
      className="border border-2 d-inline-block text-muted mb-1 me-2"
      disabled
    >
      <img src={icon} alt='icon' className='pe-1 align-middle'/>
      <span className='d-none d-lg-inline-block align-middle'>{text}</span>
      <Badge bg='secondary' text='light'className='ms-2 rounded-pill bg-opacity-50'>
        {stat}
      </Badge>
    </Badge>
  )
}

const RepositoryItem = ({ repo }) => {

  let shortDesc = repo?.description?.split(" ")
  if(shortDesc && shortDesc.length > 3){
    shortDesc = shortDesc.slice(0, 3).join(" ").concat(' ...')
  } else {
    shortDesc = "..."
  }

  return (
    <Accordion.Item eventKey={repo.id}>
      <Accordion.Header>
        <span><b>{repo.name}</b></span>
        <span className='d-none d-md-block text-truncate text-break' style={{maxWidth: '25em'}}>
          <small className='text-center fs-7 fw-light'>:{' '}{shortDesc}</small>
        </span>
      </Accordion.Header>
      <Accordion.Body>
        <div className='d-flex'>
          <div className="flex-grow-1 bd-highlight me-3">
            <a href={repo.html_url} target='_blank' className='mb-2'>Check it out</a>
            <br/>
            <div className='d-md-none pt-3'>
              {repo.description}
            </div>
          </div>
          <div className='d-flex flex-md-row flex-column justify-content-md-end'>
            <Badge bg="info" className='rounded-pill align-self-center mb-1 me-2 fs-7'>{repo.language}</Badge>
            <BadgeStat
              stat={repo.subscribers_count || 0}
              icon={eyeIcon}
              text={'Watchers'}
            />
            <BadgeStat
              stat={repo.stargazers_count}
              icon={starIcon}
              text={'Starred'}
            />
            <BadgeStat
              stat={repo.forks_count}
              icon={forkIcon}
              text={'Forked'}
            />
          </div>
        </div>
        <div>
          <span className='d-none d-md-block pt-3'>
            {repo.description}
          </span>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  )
}

export default RepositoryItem

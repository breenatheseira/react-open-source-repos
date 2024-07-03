import Accordion from 'react-bootstrap/Accordion';
import Badge from 'react-bootstrap/Badge';

import eyeIcon from '../../assets/eye.svg'
import starIcon from '../../assets/star.svg'
import forkIcon from '../../assets/fork.svg'

const BadgeStat = ({ stat, icon, text }) => {
  return (
    <div 
      style={{minWidth: '70px'}}
      className="badge bg-light text-secondary text-wrap fs-7 me-2 mb-1"
    >
      <div className='d-inline-block'>
        {stat} <img src={icon} alt='eye icon' className='ps-2 pe-1'/>
      </div>
      <span className='d-none d-lg-inline-block'>{text}</span>
    </div>
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
        <span className='me-2'>{repo.name}:</span>
        <span className='d-none d-md-block text-truncate text-break' style={{maxWidth: '25em'}}>
          <small className='text-center fs-7 fw-light'>{shortDesc}</small>
        </span>
      </Accordion.Header>
      <Accordion.Body>
        <div className='d-flex'>
          <div className="flex-grow-1 bd-highlight me-3">
            <span>
              <a href={repo.html_url} target='_blank' className='mb-2'>Check it out</a>
            </span>
            <br/>
            <span className='d-md-none pt-3'>
              {repo.description}
            </span>
          </div>
          <div className='d-flex flex-md-row flex-column justify-content-md-end'>
            <Badge bg="info" className='align-self-center mb-1 me-2 fs-7'>{repo.language}</Badge>
            <BadgeStat
              stat={repo.watchers_count}
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

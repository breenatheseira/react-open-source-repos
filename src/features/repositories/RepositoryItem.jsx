import Accordion from 'react-bootstrap/Accordion';

import eyeIcon from '../../assets/eye.svg'
import starIcon from '../../assets/star.svg'
import forkIcon from '../../assets/fork.svg'

const RepositoryItem = ({ repo }) => {
  return (
    <Accordion.Item eventKey={repo.id}>
      <Accordion.Header>{repo.name}</Accordion.Header>
      <Accordion.Body>
        <div className='d-flex pb-3'>
          <div className="flex-grow-1 bd-highlight" style={{width: '60px'}}>
            <span>
              <a href={repo.html_url} target='_blank' className='mb-2'>Check it out</a>
            </span>
          </div>
          <div>
            <div className="badge bg-light text-secondary text-wrap align-self-center fs-7 w-80 me-2">
              {repo.watchers_count}
              <img src={eyeIcon} alt='eye icon' className='pb-1 ps-2 pe-1'/>
              Watchers
            </div>
            <div className="badge bg-light text-secondary text-wrap align-self-center fs-7 w-80 me-2">
              {repo.stargazers_count}
              <img src={starIcon} alt='star icon' className='pb-1 ps-2 pe-1'/>
              Starred
            </div>
            <div className="badge bg-light text-secondary text-wrap align-self-center fs-7 w-80">
              {repo.forks_count}
              <img src={forkIcon} alt='fork icon' className='pb-1 ps-2 pe-1'/>
              Forked
            </div>
          </div>
        </div>
        <div>
          {repo.description}
        </div>
      </Accordion.Body>
    </Accordion.Item>
  )
}

export default RepositoryItem
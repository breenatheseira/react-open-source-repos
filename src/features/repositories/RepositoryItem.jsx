import Accordion from 'react-bootstrap/Accordion';

import eyeIcon from '../../assets/eye.svg'
import starIcon from '../../assets/star.svg'
import forkIcon from '../../assets/fork.svg'

const BadgeStat = ({ stat, icon, text }) => {
  return (
    // <div className="badge bg-light text-secondary text-wrap align-self-center fs-7 me-2">
    <div className="badge bg-dark text-secondary text-wrap align-self-center fs-7 me-2">
      <span>{stat}</span>
      <img src={icon} alt='eye icon' className='pb-1 ps-2 pe-1'/>
      <span className='d-none d-md-inline-block'>{text}</span>
    </div>
  )
}

const RepositoryItem = ({ repo }) => {
  return (
    <Accordion.Item eventKey={repo.id}>
      <Accordion.Header>{repo.name}</Accordion.Header>
      <Accordion.Body>
        <div className='d-flex pb-3'>
          <div className="flex-grow-1 bd-highlight" style={{width: '50px'}}>
            <span>
              <a href={repo.html_url} target='_blank' className='mb-2'>Check it out</a>
            </span>
          </div>
          <div className=''>
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
          {repo.description}
        </div>
      </Accordion.Body>
    </Accordion.Item>
  )
}

export default RepositoryItem

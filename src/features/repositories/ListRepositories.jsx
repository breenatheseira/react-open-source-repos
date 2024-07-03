import useElementOnScreen from '../../hooks/useElementOnScreen'

import Accordion from 'react-bootstrap/Accordion';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { 
  fetchRepositories, 
  fetchRepository,
  selectAllRepositories, 
  selectRepositoryIds,
} from './repositoriesSlice'

import RepositoryItem from './RepositoryItem';
import Loader from '../../components/Loader'
import ErrorDismissableAlert from '../../components/ErrorDismissableAlert'

const ListRepositories = ({ searchText }) => {
  const dispatch = useDispatch()

  const repositoriesStatus = useSelector(state => state.repositories.status)
  const repos = useSelector(selectAllRepositories)
  const repoIds = useSelector(selectRepositoryIds)
  const error = useSelector(state => state.repositories.error)

  const [ containerRef, isVisible ] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  })

  // fetch for the first time, or when end of page is reached
  useEffect(() => {
    if(repositoriesStatus === 'fully_loaded'){
      return
    }
    if(repositoriesStatus === 'idle' || isVisible){
      dispatch(fetchRepositories())
        .unwrap()
        .then((response) => {
          if(response.page === 1){
            const id = response.data[0].id
            dispatch(fetchRepository(id))
          }
        })
        .catch(e => {
          console.log(e.error_message)
        })
    }
  }, [isVisible])

  const results = [];

  repos.forEach(repo => {
    if(repo.name.includes(searchText)){
      results.push(<RepositoryItem repo={repo} key={repo.id} />);
    }
    return;
  });

  let content
  switch(repositoriesStatus){
    case 'loading':
      content = <Loader text={'Loading...'}/>
      break;
    case 'failed':
      content = <ErrorDismissableAlert message={error} />
      break;
    default:
      content = ''
      break;
  }

  function handleOnSelect(repoId){
    if(repoId !== null)
      dispatch(fetchRepository(repoId))
  }

  return (
    <>
      <div className='pb-5 text-center'>
        <span>Repositories Loaded: {' '}{repoIds.length}</span>
      </div>
      {(repoIds.length === 0) ? (content) : (<></>)}
      {(repoIds.length > 0) ? (
        <Accordion 
          defaultActiveKey={repoIds && repoIds[0]}
          onSelect={(e) => {handleOnSelect(e)}}
        >
          {results}
          {content}
          <div ref={containerRef}></div>
        </Accordion>
      ) : (
        <></>
      )}
      
    </>
  )
}

export default ListRepositories
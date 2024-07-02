import useElementOnScreen from '../../hooks/useElementOnScreen'

import Accordion from 'react-bootstrap/Accordion';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { 
  fetchRepositories, 
  selectAllRepositories, 
  selectRepositoryIds,
} from './repositoriesSlice'

import RepositoryItem from './RepositoryItem';

const ListRepositories = ({ searchText }) => {
  const dispatch = useDispatch()

  const isLoading = useSelector(state => state.repositories.status)
  const repos = useSelector(selectAllRepositories)
  const repoIds = useSelector(selectRepositoryIds)

  const [ containerRef, isVisible ] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  })

  // fetch for the first time, or when end of page is reached
  useEffect(() => {
    if(isLoading === 'idle' || isVisible){
      dispatch(fetchRepositories())
    }
  }, [isVisible])

  const results = [];

  repos.forEach(repo => {
    if(repo.name.includes(searchText)){
      results.push(<RepositoryItem repo={repo} key={repo.id} />);
    }
    return;
  });

  return (
    <>
      <div className='pb-5 text-center'>
        <span>Repositories Loaded: {' '}{repos.length}</span>
      </div>
      {(repoIds.length > 0) ? (
        <Accordion defaultActiveKey={repoIds && repoIds[0]}>
          {results}
          <div ref={containerRef}></div>
        </Accordion>
      ) : (
        <></>
      )}
      
    </>
  )
}

export default ListRepositories
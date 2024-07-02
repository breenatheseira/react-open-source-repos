import Accordion from 'react-bootstrap/Accordion';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { fetchRepositories, selectAllRepositories, selectRepositoryIds } from './repositoriesSlice'

import RepositoryItem from './RepositoryItem';

const ListRepositories = ({ searchText }) => {
  const dispatch = useDispatch()

  const isLoading = useSelector(state => state.repositories.status)
  const repos = useSelector(selectAllRepositories)
  const repoIds = useSelector(selectRepositoryIds)

  useEffect(() => {
    if(isLoading === 'idle'){
      dispatch(fetchRepositories())
    }
  }, [])

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
      <Accordion defaultActiveKey={repoIds[0]}>
        {results}
      </Accordion>
    </>
  )
}

export default ListRepositories
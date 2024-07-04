import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import Accordion from 'react-bootstrap/Accordion';
import useElementOnScreen from '../../hooks/useElementOnScreen'

import { fetchRepos } from './stores/repositoryActions'

import {
  selectAllRepositories, 
  selectRepositoryIds,
  fetchRepository,
} from './stores/repositoriesSlice'

import RepositoryItem from './RepositoryItem';
import Loader from '../../components/Loader'
import ErrorDismissableAlert from '../../components/ErrorDismissableAlert'

const ListRepositories = ({ searchText }) => {
  const dispatch = useDispatch()

  const repositoriesStatus = useSelector(state => state.repositories.status)
  const searchStatus = useSelector(state => state.repositories.searchStatus)
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
    if(repositoriesStatus === 'idle' || isVisible){
      dispatch(fetchRepos.start())
        // .unwrap()
        // .then((response) => {
        //   if(response.page === 1){
        //     const id = response.data[0].id
        //     dispatch(fetchRepository(id))
        //   }
        // })
        // .catch(e => {
        //   console.log(e)
        // })
    }
  }, [isVisible])

  const results = [];

  repos.forEach(repo => {
    if(repo.name.includes(searchText)){
      results.push(<RepositoryItem repo={repo} key={repo.id} />);
    }
    return;
  });

  let content = ''
  if(repositoriesStatus === 'loading' || searchStatus === 'loading'){
    content = <Loader text={'Loading...'}/>
  } else {
    if(repositoriesStatus === 'failed' || searchStatus === 'failed'){
      content = <ErrorDismissableAlert message={error} />
    } else {
      content = ''
    }
  }

  function handleOnSelect(repoId){
    if(repoId !== null)
      dispatch(fetchRepository(repoId))
  }

  return (
    <>
      loaded: {repos.length}
      <br/>
      status: {repositoriesStatus}
      <hr className='py-2' />
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
import SearchBar from '../../components/SearchBar';
import Accordion from '../../components/Accordion';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { fetchRepositories, selectAllRepositories } from './repositoriesSlice'

const ListRepositories = () => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch()

  const isLoading = useSelector(state => state.repositories.status)
  const repos = useSelector(selectAllRepositories)

  useEffect(() => {
    if(isLoading === 'idle'){
      dispatch(fetchRepositories())
    }
  }, [])

  return (
    <div>
      <div>
        <h1>React Community's <br/> Open Source Repo Directory</h1>
      </div>
      <div>
        <span>Repositories Loaded: {' '}{repos.length}</span>
      </div>
      <div>
        <SearchBar 
          searchText={searchText}
          onSearchTextChange={setSearchText} />
      </div>
      <div>
        <Accordion
          repos={repos}
          searchText={searchText} />
      </div>
    </div>
  )
}

export default ListRepositories
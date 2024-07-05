import { useDispatch } from "react-redux"
import SearchBar from "../../components/SearchBar"

import { searchRepos } from './stores/repositoryActions'

const SearchRepositories = ({ text, setText }) => {
  const dispatch = useDispatch()
 
  function handleDebounce(trimmedText){
    if(trimmedText === '' || trimmedText === null){
      return
    }
    dispatch(searchRepos.start(trimmedText))
  }

  return (
    <SearchBar 
      searchText={text}
      onSearchTextChange={setText}
      onDebounceChange={handleDebounce}
      placeholder='Press Enter to Search'
    />
  )
}

export default SearchRepositories
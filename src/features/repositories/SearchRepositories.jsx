import { useEffect } from "react"
import { useDispatch } from "react-redux"
import SearchBar from "../../components/SearchBar"
import { searchRepositories } from "./repositoriesSlice"

const SearchRepositories = ({ identifier, initialText, text, setText }) => {
  const dispatch = useDispatch()

  function handleDebounce(trimmedText){
    dispatch(searchRepositories(trimmedText))
  }

  useEffect(() =>{
    dispatch(searchRepositories(initialText))
  },[initialText])

  return (
    <SearchBar 
      identifier={identifier}
      searchText={text}
      onSearchTextChange={setText}
      onDebounceChange={handleDebounce}
      placeholder='Press Enter to Search'
    />
  )
}

export default SearchRepositories
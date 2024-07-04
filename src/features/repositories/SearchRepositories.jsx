import { useEffect } from "react"
import { useDispatch } from "react-redux"
import SearchBar from "../../components/SearchBar"
import { searchRepositories } from "./repositoriesSlice"

const SearchRepositories = ({ text, setText }) => {
  const dispatch = useDispatch()
 
  function handleDebounce(trimmedText){
    console.log(trimmedText)
    if(trimmedText === '' || trimmedText === null){
      return
    }
    dispatch(searchRepositories(trimmedText))
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
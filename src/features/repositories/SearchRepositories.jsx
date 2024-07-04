import { useDispatch } from "react-redux"
import SearchBar from "../../components/SearchBar"
import { searchRepositories } from "./repositoriesSlice"

const SearchRepositories = ({ text, setText }) => {
  const dispatch = useDispatch()

  function handleEnterDown(trimmedText){
    console.log('handleEnterDown')
    console.log(trimmedText)
    dispatch(searchRepositories(trimmedText))
  }

  return (
    <SearchBar 
      searchText={text}
      onSearchTextChange={setText}
      onEnterDown={handleEnterDown}
      placeholder='Press Enter to Search'
    />
  )
}

export default SearchRepositories
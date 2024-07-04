import { useEffect } from "react"
import { useDispatch } from "react-redux"
import SearchBar from "../../components/SearchBar"
import { searchRepositories } from "./repositoriesSlice"

const SearchRepositories = ({ identifier, initialText, text, setText }) => {
  const dispatch = useDispatch()
  const isinitialTextValid = (initialText !== null && initialText !== '' && initialText !== undefined && initialText.length > 1)

  function handleDebounce(trimmedText){
    console.log(trimmedText)
    if(trimmedText === '' || trimmedText === null){
      return
    }
    dispatch(searchRepositories(trimmedText))
  }

  useEffect(() =>{
    if(isinitialTextValid){
      dispatch(searchRepositories(initialText))
    }
  },[isinitialTextValid])

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
import useDebounce from "../hooks/useDebounce";

const SearchBar = ({ identifier, searchText, onSearchTextChange, onDebounceChange }) => {

  const debouncedRequest = useDebounce(() => {
    // send request to the backend
    // access to latest state here
    const trimmedText = searchText.trim()
    onDebounceChange(trimmedText)
  });

  function handleOnChange(e){ 
    onSearchTextChange(e.target.value) 
    debouncedRequest()
  }  

  return (
    <input
      id={identifier} 
      className="form-control form-control-lg"
      type="text" 
      value={searchText}
      onChange={handleOnChange}
      placeholder="Search..."
    />
  )
}

export default SearchBar
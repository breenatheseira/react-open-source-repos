import useDebounce from "../hooks/useDebounce";

const SearchBar = ({ searchText, onSearchTextChange, onEnterDown }) => {

  const debouncedRequest = useDebounce(() => {
    // send request to the backend
    // access to latest state here
    const trimmedText = searchText.trim()
    console.log(trimmedText);
    onEnterDown(trimmedText)
  });

  function handleOnChange(e){ 
    onSearchTextChange(e.target.value) 
    debouncedRequest()
  }  

  return (
    <input 
      className="form-control form-control-lg"
      type="text" 
      value={searchText}
      onChange={handleOnChange}
      placeholder="Search..."
    />
  )
}

export default SearchBar
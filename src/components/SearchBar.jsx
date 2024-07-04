const SearchBar = ({ searchText, onSearchTextChange, onEnterDown }) => {

  function handleOnChange(e){ 
    onSearchTextChange(e.target.value) 
  }
  function handleOnKeyDown(e){
    const trimmedText = e.target.value.trim()

    // If user pressed Enter key
    if (e.which === 13 && trimmedText) {
      onEnterDown(trimmedText)
    }
  }

  return (
    <input 
      className="form-control form-control-lg"
      type="text" 
      value={searchText}
      onKeyDown={handleOnKeyDown}
      onChange={handleOnChange}
      placeholder="Search..."
    />
  )
}

export default SearchBar
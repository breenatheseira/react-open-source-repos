export default function SearchBar({ searchText, onSearchTextChange }){
  return (
    <form>
      <input 
        type="text" 
        value={searchText}
        onChange={ (e) => { onSearchTextChange(e.target.value) } }
        placeholder="Search..." />
    </form>
  )
}
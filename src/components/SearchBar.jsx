import Form from 'react-bootstrap/Form';

export default function SearchBar({ searchText, onSearchTextChange }){
  return (
    <Form>
      <Form.Control 
        size="lg" 
        type="text" 
        value={searchText}
        onChange={ (e) => { onSearchTextChange(e.target.value) } }
        placeholder="Search..."
      />
    </Form>
  )
}
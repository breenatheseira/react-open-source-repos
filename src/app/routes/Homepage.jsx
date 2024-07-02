import SearchBar from '../../components/SearchBar'
import ListRepositories from '../../features/repositories/ListRepositories'

import { useState } from "react"

const Homepage = () => {
  const [searchText, setSearchText] = useState('')

  return (
    <>
      <div className='container py-5 text-center'>
        <div className='row'>
          <h3>Welcome to the</h3>
          <h1>ReactJS Community's Repository Directory</h1>
        </div>
      </div>
      <div className="container">
        <div className="row w-50 mx-auto">
          <SearchBar 
            searchText={searchText}
            onSearchTextChange={setSearchText} />
        </div>
      </div>
      <div className="container py-5">
        <div className="row w-75 mx-auto">
          <ListRepositories
            searchText={searchText}
          />
        </div>
      </div>
    </>
  )

}

export default Homepage
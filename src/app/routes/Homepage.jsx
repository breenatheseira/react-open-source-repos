import { useState } from "react"

import ListRepositories from '../../features/repositories/ListRepositories'
import SearchRepositories from '../../features/repositories/SearchRepositories'

const Homepage = () => {
  const [searchText, setSearchText] = useState('')

  function handleTextChange(value){
    setSearchText(value)
  }

  return (
    <>
      <div className='container py-5 text-center'>
        <div className='row'>
          <h3>Welcome to the</h3>
          <h1>ReactJS Community's Repository Directory</h1>
        </div>
      </div>
      <div className="container">
        <div className="row w-50 mx-auto" style={{minWidth: '250px'}}>
          <SearchRepositories
            text={searchText}
            setText={handleTextChange} />
        </div>
      </div>
      <div className="container py-5">
        <div className="row w-75 mx-auto" style={{minWidth: '300px', maxWidth: '700px'}}>
          <ListRepositories
            searchText={searchText}
          />
        </div>
      </div>
    </>
  )
}

export default Homepage
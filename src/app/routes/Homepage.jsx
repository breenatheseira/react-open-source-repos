import { useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"

import ListRepositories from '../../features/repositories/ListRepositories'
import SearchRepositories from '../../features/repositories/SearchRepositories'

const Homepage = () => {
  const identifier = 'repoSearchInput'
  const [searchText, setSearchText] = useState('')
  const [searchParams, setSearchParams] = useSearchParams();
  const refParams = useRef(null)
  
  if(refParams.current === null){
    let params = new URLSearchParams(location.search)
    if (params.has('q')){
      refParams.current = params.get('q')
      setSearchText(refParams.current)
    }
  }

  function handleTextChange(value){
    const trimmedValue = value.trim()
    const params = trimmedValue === '' ? {} : { q: value.trim() }
    const isFirstSearch = value == null

    setSearchText(value)
    setSearchParams(params, { replace: !isFirstSearch })
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
            initialText={refParams.current}
            identifier={identifier}
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
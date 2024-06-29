import SearchBar from '../components/SearchBar';
import Accordion from '../components/Accordion';
import { useEffect, useState } from 'react';
import getAllRepos from '../utils/githubApi';

export default function App() {
  const [searchText, setSearchText] = useState('');
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {

    // setRepos(sampleRepos);
    // works, don't use the rates unnecessarily
    getAllRepos(page).then( response => {
      setRepos(response.data);
    });

  }, [page])

  return (
    <div>
      <div>
        <h1>React Community's <br/> Open Source Repo Directory</h1>
      </div>
      <div>
        <SearchBar 
          searchText={searchText}
          onSearchTextChange={setSearchText} />
      </div>
      <div>
        <Accordion
          repos={repos}
          searchText={searchText} />
      </div>
    </div>
  )
}


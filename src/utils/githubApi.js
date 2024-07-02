import axios from 'axios'

// https://api.github.com/orgs/reactjs/repos?sort=full_name&page=1
const allReactReposPath = '/orgs/reactjs/repos';

// https://api.github.com/search/repositories?page=1&q=t+in:name+org:reactjs
const searchRepo = '/search/repositories';

const options = {
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }
}

if(import.meta.env.VITE_GITHUB_BEARER_TOKEN){
  options.headers['Authorization'] = 'Bearer ' + import.meta.env.VITE_GITHUB_BEARER_TOKEN
}

async function fetchInitialRepos(page){
  options.params = {
    sort: 'full_name',
    page
  };

  return axios.get(allReactReposPath, options);
}

export default fetchInitialRepos;
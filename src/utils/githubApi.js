import axios from 'axios'

// https://api.github.com/orgs/reactjs/repos?sort=full_name&page=1
const allReactReposPath = '/orgs/reactjs/repos';

// https://api.github.com/repos/reactjs/ar.react.dev
const getRepoByIdPath = '/repos/'

// https://api.github.com/search/repositories?page=1&q=in:name+org:reactjs+t
const searchRepoPath = '/search/repositories';

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

export async function fetchInitialRepos(page = 1){
  const path = allReactReposPath
  const requestOptions = options

  requestOptions.params = {
    sort: 'full_name',
    page
  };

  return axios.get(path, requestOptions);
}

export async function fetchOneRepo(fullName){
  const path = getRepoByIdPath + fullName
  const requestOptions = options

  return axios.get(path, requestOptions)
}

export async function searchForRepository(query, page = 1){
  const searchQuery = 'in:name org:reactjs ' + query
  const searchOptions = options
  searchOptions.params = { q: searchQuery, page }
  
  return axios.get(searchRepoPath, searchOptions)
}
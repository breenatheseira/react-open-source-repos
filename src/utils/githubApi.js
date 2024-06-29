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

async function getAllRepos(pageNumber = 1){
  options.params = {
    sort: 'full_name',
    page: pageNumber
  };

  return axios.get(allReactReposPath, options);
}

export default getAllRepos;
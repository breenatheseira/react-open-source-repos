import axios from 'axios'

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

const paths = {
  // https://api.github.com/orgs/reactjs/repos?sort=full_name&page=1
  fetchRepositories: (page) => `/orgs/reactjs/repos?sort=full_name&page=${page}`,
  // https://api.github.com/repos/reactjs/ar.react.dev (full_name: reactjs/ar.react.dev)
  fetchOneRepository: (fullName) => `/repos/${fullName}`,
  // https://api.github.com/search/repositories?page=1&q=in:name+org:reactjs+t (query: t)
  searchRepositories: (query, page) => `/search/repositories?page=${page}&q=${query} in:name org:reactjs`
}

const githubApi = {
  async fetchRepos(page = 1){
    return await axios.get(paths.fetchRepositories(page), options)
      .then(response => response)
      .catch(error => { throw error })
  },
  async fetchOneRepo(name){
    return await axios.get(paths.fetchOneRepository(name), options)
      .then(response => response)
      .catch(error => { throw error })
  },
  async searchForRepos(query, page = 1){
    return await axios.get(paths.searchRepositories(query, page), options)
      .then(response => response)
      .catch(error => { throw error })
  }
}

export default githubApi
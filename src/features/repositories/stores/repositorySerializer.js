export const formatRepository = (repository) => {
  if(repository.error){
    return repository
  }

  const subCount = repository.subscribers_count || null
  const subStatus = (subCount === null ? 'idle' : 'loaded')

  return {
    id: repository.id,
    name: repository.name,
    fullName: repository.full_name,
    description: repository.description,
    language: repository.language,
    url: repository.html_url,
    starred: repository.stargazers_count,
    watchers: subCount,
    forked: repository.forks_count,
    subscribersStatus: subStatus
  }
}

export const formatManyRepositories = (repositories) => {
  return repositories.map(repo => formatRepository(repo))
}
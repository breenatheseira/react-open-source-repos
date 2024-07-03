export const repositorySerializer = (repository) => {
  if(repository.error){
    return repository
  }

  const subCount = repository.subscribers_count || null
  const subStatus = (subCount === null ? 'idle' : 'loaded')

  return {
    id: repository.id,
    name: repository.name,
    full_name: repository.full_name,
    description: repository.description,
    language: repository.language,
    html_url: repository.html_url,
    stargazers_count: repository.stargazers_count,
    subscribers_count: subCount,
    forks_count: repository.forks_count,
    subscribers_status: subStatus
  }
}
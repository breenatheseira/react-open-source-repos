export const repositorySerializer = (repository) => {
  return {
    id: repository.id,
    name: repository.name,
    description: repository.description,
    language: repository.language,
    html_url: repository.html_url,
    watchers_count: repository.watchers_count,
    subscribers_count: repository.subscribers_count,
    forks_count: repository.forks_count,
  }
}
export default function Accordion({ repos, searchText }){
  const results = [];

  repos.forEach(repo => {
    if(repo.name.includes(searchText)){
      results.push(repo);
    }
    return;
  });

  return (
    <>
      {( results && results.map((repo)=>{
        return (
          <div key={repo.id}>
            <span>name: {repo.name}</span><br/>
            <span>description: {repo.description}</span><br/>
            <span>stargazers_count: {repo.stargazers_count}</span><br/>
            <span>watchers_count: {repo.watchers_count}</span><br/>
            <span>forks_count: {repo.forks_count}</span><br/>
          </div>
        )
      }))}
    </>
  )
}
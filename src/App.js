import React, { useEffect, useState } from "react";
import API from './services/api';

import "./styles.css";

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    async function getRepos() {
      const nowRepos = await API.get('/repositories');
      setRepos(nowRepos.data);
    };

    getRepos();
  }, []);

  async function handleAddRepository() {
    const newRepo = await API.post('/repositories', {
      title: 'Teste4',
      url: 'https://github.com/1nickael1/GoStackDesafio-1.2',
      techs: ["Node.js", "ReactJs"]
    });

    setRepos([...repos, newRepo.data]);
  }

  async function handleRemoveRepository(id) {
    await API.delete(`/repositories/${id}`); // Aqui ta funcionando

    setRepos(repos.filter(r => r.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

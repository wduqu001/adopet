import React, { useEffect, useState } from 'react';

import './App.css';
import { API_KEY } from './config';
import { authenticate } from './authentication.helper';

const App: React.FC = () => {
  const [access_key, setAccessKey] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const storedAccessKey: string | null = localStorage.getItem("access_key");

    if (!storedAccessKey || storedAccessKey === 'undefined') {
      if (!API_KEY) {
        alert("API_KEY was not found. Please add a API_KEY to the config.ts file")
        return;
      }

      (async () => {
        const access_key: string | null = await authenticate(API_KEY)
        if (!access_key) {
          alert("User authentication failed");
          return;
        }
        setAccessKey(access_key);
        localStorage.setItem("access_key", access_key);
        setLoaded(true);
      })();
      return;
    }

    setAccessKey(storedAccessKey);
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        Pet Search
      </header>
    </div>
  );
}

export default App;

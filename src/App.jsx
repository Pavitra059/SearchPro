import { useEffect, useRef, useState } from "react";
import './App.css';

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [data, setData] = useState([]);

  const debounceRef = useRef(null);
  const cacheRef = useRef({});

  useEffect(() => {
    fetch("http://localhost:4000/programming")
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error("Failed to fetch data:", err));
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (!value) {
        setResults([]);
        return;
      }

      if (cacheRef.current[value]) {
        setResults(cacheRef.current[value]);
        return;
      }

      const lowerValue = value.toLowerCase();
      
      const startsWith = data.filter(item =>
        item.name.toLowerCase().startsWith(lowerValue)
      );

      const contains = data.filter(item =>
        !item.name.toLowerCase().startsWith(lowerValue) &&
        item.name.toLowerCase().includes(lowerValue)
      );

      const filteredResults = [...startsWith, ...contains];
   
      cacheRef.current[value] = filteredResults;
      
      const keys = Object.keys(cacheRef.current);
      if (keys.length > 10) {
        delete cacheRef.current[keys[0]];
      }

      setResults(filteredResults);
    }, 300);
  };

  const highlightMatch = (text, keyword) => {
    if (!keyword) return text;

    const parts = text.split(new RegExp(`(${keyword})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === keyword.toLowerCase()
        ? <strong key={index}>{part}</strong>
        : part
    );
  };

  return (
    <div className="container">
      <h1>SearchPro</h1>

      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
      />

      {results.length > 0 && (
        <div className="dropdown">
          {results.map(item => (
            <div key={item.id} className="dropdown-item">
              <span className="icon">🔍</span> {highlightMatch(item.name, query)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
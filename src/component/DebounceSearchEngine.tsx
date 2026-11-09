import React, {useState, useEffect } from "react";

type DebounceSearchProp = {
  onSearch: (query: string) => void
}
export function DebounceSearchEngine({ onSearch }: DebounceSearchProp) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDebouncing, setIsDebouncing] = useState(false);

  useEffect(() => {
    setIsDebouncing(true);

    const timerId = setTimeout(() => {
      onSearch(searchTerm);
      setIsDebouncing(false);
    }, 400);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm, onSearch]);

  return (
    <div style={{ position: 'relative', width: '300px'}}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search assets..."
        style={{
          width: '100%',
          padding: '8px 12px',
          background: '#1e293b',
          border: '1px solid #475569',
          borderRadius: '4px',
          color: '#fff',
          outline: 'none'
        }}
      />
      {isDebouncing && (
        <span style={{
          position: 'absolute',
          right: '10px',
          top: '8px',
          fontSize: '11px',
          color: '#94a3b8'
        }}
        >
          typing...
        </span>
      )}
    </div>
  )
}
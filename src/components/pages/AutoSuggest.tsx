import React, { useState, ChangeEvent } from 'react';
import { Form, Dropdown } from 'react-bootstrap';

interface AutoSuggestProps {
  suggestions: string[];
  onSuggestionSelect: (suggestion: string) => void;
}

const AutoSuggest: React.FC<AutoSuggestProps> = ({ suggestions, onSuggestionSelect }) => {
  const [query, setQuery] = useState<string>('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelect = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    onSuggestionSelect(suggestion);
  };

  return (
    <div>
      <Form.Control
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Type to search..."
      />
      {showSuggestions && (
        <Dropdown show={showSuggestions}>
          <Dropdown.Menu show className="w-100">
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((suggestion, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => handleSelect(suggestion)}
                >
                  {suggestion}
                </Dropdown.Item>
              ))
            ) : (
              <Dropdown.Item disabled>No suggestions found</Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  );
};

export default AutoSuggest;

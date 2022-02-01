import { useState } from 'react';


function InputField({ onSubmit, cityNames }) {


  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);


  // passes text to parent to be used in Api call and resets input field text
  const handleOnSubmit = (event) => {
    event.preventDefault();
    onSubmit(text);
    setText('');
  }


  // allows user to sumbit city using enter button
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleOnSubmit(event);
    }
  }


  // matches user input to list of cities available to max 9 queries
  const handleSuggestions = (event) => {
    setText(event)
    let matches = [];
    if (event.length > 0) {
      matches = cityNames.filter( name => {
      const regex = new RegExp(`${event}`, "gi");
      return name.match(regex);
      })
    }
    setSuggestions(matches.slice(0, 9));
  }


  // sets clicked autocomplete suggestion as text and resets suggestions to empty array
  const clickSuggestions = (text) => {
    setText(text);
    setSuggestions([]);
  }


  return (
    <>
      <form className="input-field-container">
        <label htmlFor="input-field" className="label">Search</label>
        <input
          className="input-field"
          type="text"
          placeholder="e.g. Manchester"
          id="input-field"
          name="input-field"
          autoComplete="off"
          value={text}
          onChange={event => setText(event.target.value), event => handleSuggestions(event.target.value)}
          onKeyPress={handleKeyPress}
          onBlur={() => {
            setTimeout(() => {
              setSuggestions([])
            }, 300);
          }}
        >
        </input>
        <div className="suggestion-container">
          {suggestions && suggestions.map((suggestion, i) =>
          <div className="suggestions"
            key ={i}
            onClick={() => clickSuggestions(suggestion)}
          >{suggestion}</div>
          )}
        </div>
      </form>
      <button
        className="search-button"
        onClick={handleOnSubmit}>
        <span className="search-button-text">Find</span>
      </button>
    </>
  );
}


export default InputField;
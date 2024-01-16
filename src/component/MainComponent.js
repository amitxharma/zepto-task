import React, { useState, useRef, useEffect } from "react";
import dummyData from "../dummy.json";
import "../App.css";

const MainComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChips, setSelectedChips] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [highlightedChip, setHighlightedChip] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setFilteredSuggestions(
      dummyData.filter(
        (item) =>
          !selectedChips.includes(item.name) &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, selectedChips]);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  const handleSuggestionSelect = (selectedItem) => {
    setSelectedChips([...selectedChips, selectedItem]);
    setSearchTerm("");
  };

  const handleChipRemove = (removedChip) => {
    setSelectedChips(selectedChips.filter((chip) => chip !== removedChip));
  };

  const handleInputKeyDown = (event) => {
    if (
      event.key === "Backspace" &&
      searchTerm === "" &&
      selectedChips.length > 0
    ) {
      const lastChip = selectedChips[selectedChips.length - 1];
      setHighlightedChip(lastChip);
      event.preventDefault();
    }
    if (event.key === "Backspace" && highlightedChip) {
      handleChipRemove(highlightedChip);
      setHighlightedChip(null);
    }
  };

  return (
    <div className="custom-chip-container">
      <div className="custom-chip-input-container">
        {selectedChips.map((chip, index) => (
          <div
            key={index}
            className={`custom-chip ${
              highlightedChip === chip ? "highlighted" : ""
            }`}
          >
            <img
              src={dummyData.find((item) => item.name === chip)?.image}
              alt={chip}
              className="custom-chip-avatar"
            />
            {chip}{" "}
            <span
              onClick={() => handleChipRemove(chip)}
              className="custom-chip-remove"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/1828/1828778.png"
                alt="Remove"
                width="15"
                height="15"
              />
            </span>
          </div>
        ))}

        <div>
          <input
            type="text"
            ref={inputRef}
            value={searchTerm}
            onChange={handleSearchTermChange}
            onKeyDown={handleInputKeyDown}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="Type to search..."
          />

          {showSuggestions && searchTerm.length < 1 && (
            <div className="custom-item-list">
              {filteredSuggestions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleSuggestionSelect(item.name)}
                  className="custom-item"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="custom-item-avatar"
                  />
                  <div>{item.name}</div>
                  <div className="custom-email">{item.email}</div>
                </div>
              ))}
            </div>
          )}
          {searchTerm.length > 0 && (
            <div className="custom-item-list">
              {filteredSuggestions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleSuggestionSelect(item.name)}
                  className="custom-item"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="custom-item-avatar"
                  />
                  <div>{item.name}</div>
                  <div className="custom-email">{item.email}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainComponent;

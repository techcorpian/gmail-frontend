import React, { useState } from 'react';

function CustomCheckbox({ checkboxes }) {
  // Initialize state with an array or object to track the checked status of each checkbox
  const [checkedState, setCheckedState] = useState(
    checkboxes.map(() => false) // This initializes all checkboxes as unchecked
  );

  // Handle checkbox change
  const handleCheckboxChange = (index) => {
    const updatedCheckedState = checkedState.map((item, idx) =>
      idx === index ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  return (
    <div>
      {checkboxes.map((label, index) => (
        <label key={index} className="flex items-center mb-2">
          <input
            type="checkbox"
            className="peer hidden"
            checked={checkedState[index]}
            onChange={() => handleCheckboxChange(index)}
          />
          <div
            className={`w-6 h-6 rounded ${
              checkedState[index] ? 'bg-green-500' : 'bg-gray-300'
            } relative`}
          >
            {checkedState[index] && (
              <svg
                className="w-4 h-4 text-white absolute left-1 top-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
          
        </label>
      ))}
      
    </div>
  );
}

export default CustomCheckbox;

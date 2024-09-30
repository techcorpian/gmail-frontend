import React, { useState } from 'react';

const CustomDropdown = ({options, label, value, setValue}) => {
    const [focused, setFocused] = useState(false);
    // const [selectedOption, setSelectedOption] = useState('');

    const handleFocus = () => setFocused(true);
    const handleBlur = () => {
        if (value === '') {
            setFocused(false);
        }
    };

    return (
        <div className="relative w-full">
            <select
                // value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`block w-full px-4 py-3 text-lg bg-transparent border border-gray-800 rounded ${focused ? 'focus: border-2 focus:border-blue-500' : ''
                }`}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <label
                className={`absolute left-3 transition-all duration-200 ease-in-out text-base cursor-text ${
                    focused || value
                        ? '-top-2 text-xs bg-white px-1 text-blue-600 font-semibold'
                        : 'top-3 text-gray-900 px-1'
                }`}
            >
                {label}
            </label>
        </div>
    );
};

export default CustomDropdown;

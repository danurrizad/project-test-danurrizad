import { useState, useEffect, useRef } from 'react';
import { FaCaretDown  } from 'react-icons/fa';

const Dropdown = ({ options, label, valueSelect, valueOption, handleChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (event) => {
    // Periksa apakah klik dilakukan di dalam dropdown
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Tambahkan event listener ke elemen dokumen untuk menangani klik di luar dropdown
    document.addEventListener('click', closeDropdown);

    // Membersihkan event listener saat komponen di-unmount
    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className='flex justify-center items-center gap-4'>
        <span>{label}</span>
        <select className=" bg-white shadow-lg rounded-full px-10 py-2 border-2 border-black cursor-pointer" value={valueSelect} onChange={handleChange}>
          {/* Dropdown list content */}
            {options.map((option, index) => (
            <option key={index} value={valueOption[index]} className=" px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer flex justify-between" onClick={() => handleOptionClick(option)}>
                {option}
            </option>
            ))}
        <FaCaretDown className="text-gray-800" />
        </select>
      </div>
    
    </div>
  );
};

export default Dropdown;
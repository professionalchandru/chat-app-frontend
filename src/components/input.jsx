import React from 'react'

const Input = ({type, placeholder, value, onChange, required, disabled, classes, onKeyPress}) => {
  return (
    <div className=''>
        <input 
            type={type} 
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            onKeyUp={onKeyPress}
            className={`px-5 py-2 bg-gray-50 focus:bg-white border border-border focus:outline-none focus:ring-2 focus:ring-primary rounded-md ${classes}`}
        />
    </div>
  )
}

export default Input
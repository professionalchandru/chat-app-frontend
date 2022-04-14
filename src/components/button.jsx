import React from 'react'

const Button = ({text, classes, type, onClick}) => {
  return (
    <>
        <button 
            type={type}
            onClick={onClick}
            className={`px-5 py-2 bg-primary rounded-md text-white font-medium text-base disabled:bg-indigo-300 hover:bg-indigo-600 ${classes}`}
        >
            {text}
        </button>
    </>
  )
}

export default Button
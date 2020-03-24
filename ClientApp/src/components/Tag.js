import React from 'react'
import './TagStyles.css'

const Tag = ({ label, removeInterest }) => {
    return <span onClick={() => removeInterest(label)}>{label}</span>
}

export default Tag
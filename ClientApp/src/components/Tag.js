import React from 'react'

const Tag = ({ label }) => {

    return (
        <span style={{ backgroundColor: "#1b6ec2", color: "white", borderRadius: "3px", width: "fit-content", padding: "0.3rem 0.75rem", margin: "0.25rem 0.5rem 0.25rem 0rem", display: "inline" }}>{label}</span>)

}

export default Tag
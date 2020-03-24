import React, { useState } from 'react';

import './FormStyles.css'
import Tag from './Tag'


const SuccessMessage = ({ success }) => {
    if (success === null) {
        //No submissions have been made yet. 
        return null
    }
    else if (success) {
        return (
            <div className="alert alert-success" role="alert">
                Submitted successfully.
            </div>)
    }
    else {
        return (
            <div className="alert alert-danger" role="alert">
                Oops! Something went wrong.
            </div>)
    }
}


const AddPerson = () => {

    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [birthday, setBirthday] = useState()
    //Default profile icon set for users that don't add personal image url
    const [imageURL, setImageURL] = useState("https://img.icons8.com/ios/100/000000/cat-profile.png")
    const [submitSuccess, setSubmitSuccess] = useState(null)
    const [interests, setInterests] = useState([]);

    const clearForm = () => {
        document.getElementById("add-person-form").reset()
        setInterests([])
    }

    const addPerson = async e => {
        e.preventDefault()
        const body = { firstName, lastName, birthday, imageURL, interests: interests.join(", ") }
        const request = await fetch('person', { method: "POST", body: JSON.stringify(body), headers: { "content-type": "application/json" } })
        const response = await request.json()
        if (response.success) {
            setSubmitSuccess(true)
            clearForm()
        }
        else {
            setSubmitSuccess(false)
        }
    }

    const addInterest = e => {
        e.preventDefault()
        if (e.keyCode === 188) {
            let _interests = [...interests]
            _interests.push(e.target.value.slice(0, -1))
            setInterests(_interests)
            e.target.value = ""
        }

    }

    return (
        <>
        <h1>Add a new person to the database</h1>
            <form id="add-person-form" className="needs-validation" noValidate onSubmit={addPerson}>
            <SuccessMessage success={submitSuccess} />
            <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" placeholder="Enter First Name" onChange={e => setFirstName(e.target.value)} required/>
            </div>
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Enter Last Name" onChange={e => setLastName(e.target.value)} required/>
            </div>
            <div className="form-group">
                <label>Birthday</label>
                <input type="date" className="form-control"onChange={e => setBirthday(e.target.value)} required/>
            </div>
            <div className="form-group">
                <label>Profile Picture URL</label>
                <input type="text" className="form-control" placeholder="Enter Image URL" onChange={e => setImageURL(e.target.value)}/>
                </div>
                <div id="container" className="form-group">
                    {interests.map(i => <Tag label={i} />)}
                </div>
                <div className="form-group">
                    <label>Interests</label>
                    <input type="text" className="form-control" placeholder="Enter Interests" onKeyUp={e => addInterest(e)} />
                    <small className="form-text text-muted">Press ',' to finish an interest</small>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </>
    )
}

export default AddPerson
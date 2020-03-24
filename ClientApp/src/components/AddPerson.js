import React, { useState } from 'react';
import ReactDOM from 'react';

import './FormStyles.css'


const AddPerson = () =>
{
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [birthday, setBirthday] = useState();
    const [imageURL, setImageURL] = useState();

    const addPerson = async e => {
        e.preventDefault()
        const body = { firstName, lastName, birthday, imageURL }
        const response = await fetch('person', { method: "POST", body: JSON.stringify(body), headers: { "content-type": "application/json" } })
        return (<div class="alert alert-success" role="alert"> This is a success alert—check it out! </div>)
    }

    const clearForm = e => {
        e.preventDefault()
        document.getElementById("add-person-form").reset()
    }


    return (
        <>
        <h1>Add a new person to the database</h1>
        <form id="add-person-form" class="needs-validation" novalidate onSubmit={addPerson}>
            <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control" placeholder="Enter First Name" onChange={e => setFirstName(e.target.value)} required/>
            </div>
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Enter Last Name" onChange={e => setLastName(e.target.value)} required/>
            </div>
            <div class="form-group">
                <label>Birthday</label>
                <input type="date" class="form-control"onChange={e => setBirthday(e.target.value)} required/>
            </div>
            <div class="form-group">
                <label>Profile Picture URL</label>
                <input type="text" class="form-control" placeholder="Enter Image URL" onChange={e => setImageURL(e.target.value)}/>
            </div>
            <div class="form-group">
                    <label>Interests</label>
                    <input type="text" class="form-control" placeholder="Enter Interests" onChange={e => setImageURL(e.target.value)} />
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            </>
    )
}

export default AddPerson
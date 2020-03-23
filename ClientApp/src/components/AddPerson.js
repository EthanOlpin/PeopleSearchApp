import React, { useState } from 'react';

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
    }

    return (
        <>
            <form onSubmit={addPerson}>
                <label>First Name: </label>
                <input type="text" onChange={e => setFirstName(e.target.value)} />
                <br />
                <label>Last Name: </label>
                <input type="text" onChange={e => setLastName(e.target.value)} />
                <br />
                <label>Birthday: </label>
                <input type="date" onChange={e => setBirthday(e.target.value)} />
                <br />
                <label>ImageURL: </label>
                <input type="text" onChange={e => setImageURL(e.target.value)} />
                <button>Submit</button>
            </form>
        </>
    )
}

export default AddPerson
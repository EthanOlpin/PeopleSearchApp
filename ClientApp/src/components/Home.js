import React, { Component, useState, useEffect } from 'react';

const Home = () => {


    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [birthday, setBirthday] = useState();
    const [imageURL, setImageURL] = useState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const getPersons = async () => {
        const response = await fetch('person?search=' + search)
        const data = await response.json();
        setSearchResult(data)
    }

    const addPerson = async e => {
        e.preventDefault()
        const body = { firstName, lastName, birthday, imageURL }
        const response = await fetch('person', { method: "POST", body: JSON.stringify(body), headers: { "content-type": "application/json"}})
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
            <input type="text" onChange={e => setSearch(e.target.value)}/>
            <button onClick={getPersons}>Search</button>
            <ul>{searchResult.map(p => <li>{p.firstName}</li>)}</ul>

        </>
    )
}

export default Home
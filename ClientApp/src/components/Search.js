import React, { useState } from 'react';
import moment from 'moment';
const Search = () => {

    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const getPersons = async () => {
        const response = await fetch('person?search=' + search)
        const data = await response.json()
        setSearchResult(data)
    }

    return (
        <>
            <input type="text" onChange={e => setSearch(e.target.value)} className="form-control" style={{ display: "inline", width: "400px" }}/>
            <button onClick={getPersons} className="btn btn-primary" style={{ display: "inline" }}>Search</button>
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Image</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {searchResult.map((p, i) =><tr>
                            <th>{i+1}</th>
                            <td><img src={p.imageURL} /></td>
                            <td>{p.firstName}</td>
                            <td>{p.lastName}</td>
                        <td>{moment().diff(moment(p.birthday), "year")}</td>
                    </tr>)}
                </tbody>
            </table>
        </>
    )
}

export default Search
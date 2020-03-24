import React, { useState } from 'react';
import moment from 'moment';
const Search = () => {

    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const getPersons = async () => {
        const response = await fetch('person?search=' + search.trim())
        const data = await response.json()
        setSearchResult(data)
    }

    return (
        <>
            <div className="form-inline">
                <input type="text" className="form-control" style={{ marginRight: "10px" }} placeholder="Search" onChange={e => setSearch(e.target.value)} />
                <button className="btn btn-primary" style={{ display: "inline" }} onClick={getPersons}>Search</button>
            </div>
            <table className="table" style={{ verticalAlign: "middle", marginTop:"10px"}}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Interests</th>
                    </tr>
                </thead>
                <tbody>
                    {searchResult.map((p, i) =><tr>
                            <th>{i+1}</th>
                        <td><img src={p.imageURL} style={{maxWidth:"100px"}}/></td>
                            <td>{`${p.firstName} ${p.lastName}`}</td>
                        <td>{moment().diff(moment(p.birthday), "year")}</td>
                        <td>{p.interests}</td>
                    </tr>)}
                </tbody>
            </table>
        </>
    )
}

export default Search
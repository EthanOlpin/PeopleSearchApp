import React, { useState } from 'react';
import moment, { max } from 'moment';
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
                <input type="text" onChange={e => setSearch(e.target.value)} className="form-control" style={{marginRight:"10px"}}/>
            <button onClick={getPersons} className="btn btn-primary" style={{ display: "inline" }}>Search</button>
            </div>
            <table className="table" style={{ verticalAlign: "middle", marginTop:"10px"}}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {searchResult.map((p, i) =><tr>
                            <th>{i+1}</th>
                        <td><img src={p.imageURL} style={{maxWidth:"100px"}}/></td>
                            <td>{`${p.firstName} ${p.lastName}`}</td>
                        <td>{moment().diff(moment(p.birthday), "year")}</td>
                    </tr>)}
                </tbody>
            </table>
        </>
    )
}

export default Search
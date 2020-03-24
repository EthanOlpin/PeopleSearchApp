import React, { useState } from 'react';
import moment from 'moment';
import BeatLoader from 'react-spinners/BeatLoader'
import './SearchStyles.css'

const Search = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(null);

    const getPersons = async () => {
        setLoading(true)
        setSearchResult([])
        const response = await fetch('person?search=' + search.trim())
        const data = await response.json()
        setSearchResult(data)
        setLoading(false)
    }

    return (
        <>
            <div className="form-inline">
                <input type="text" className="form-control" placeholder="Search" onChange={e => setSearch(e.target.value)} />
                <button className="btn btn-primary" onClick={getPersons}>Search</button>
            </div>

            <table className="table">
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
                    {searchResult.map((p, i) => <tr>
                        <th>{i + 1}</th>
                        <td><img src={p.imageURL} alt="" /></td>
                        <td>{`${p.firstName} ${p.lastName}`}</td>
                        <td>{moment().diff(moment(p.birthday), "year")}</td>
                        <td>{p.interests}</td>
                    </tr>)}
                </tbody>
            </table>
            <div style={{ textAlign: "center" }}>
                <BeatLoader
                    size={20}
                    color={"#1b6ec2"}
                    loading={loading}
                />
            </div>
        </>
    )
}

export default Search
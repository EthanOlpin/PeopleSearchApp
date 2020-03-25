import React, { useState } from 'react';
import moment from 'moment'
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
    const [imageURL, setImageURL] = useState("")
    const [submitSuccess, setSubmitSuccess] = useState(null)
    const [interests, setInterests] = useState([]);
    const [dateInvalid, setDateInvalid] = useState(false)

    const clearForm = () => {
        document.getElementById("add-person-form").reset()
        setInterests([])
    }

    const addPerson = async e => {
        e.preventDefault()
        const body = { firstName, lastName, birthday, imageURL, interests: interests.join(", ") }
        const response = await fetch('person', { method: "POST", body: JSON.stringify(body), headers: { "content-type": "application/json" } })

        if (response.ok) {
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

    const removeInterest = label => {
        const _interests = [...interests]
        setInterests(_interests.filter(i => i !== label))
    }

    const validateDateRange = e => {
        const now = moment()
        const inputDate = moment(e.target.value)
        if (inputDate.isBetween(moment('1900-01-01'), now)) {
            e.target.style.boxShadow = "none"
            setDateInvalid(false)
        } else {
            e.target.style.boxShadow = "#dc3545 0px 0px 1.5px 1px"
            setDateInvalid(true)
        }
    }

    return (
        <>
            <h1>Add a new person to the database</h1>
            <form id="add-person-form" className="needs-validation" novalidate onSubmit={addPerson}>
                <SuccessMessage success={submitSuccess} />
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="Enter First Name" onChange={e => setFirstName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Enter Last Name" onChange={e => setLastName(e.target.value)} required />
                </div>
                <div class="form-group">
                    <label>Birthday</label>
                    <input type="date"
                        className="form-control"
                        onBlur={e => validateDateRange(e)}
                        onChange={e => setBirthday(e.target.value)}
                        placeholder="YYYY-MM-DD"
                        required
                    />
                </div>
                {
                    dateInvalid &&
                    <div style={{ color: '#dc3545', position: 'relative', bottom: '6px' }}>
                        {`Date must be between ${'01-01-1900'} and current date.`}
                    </div>
                }
                <div className="form-group">
                    <label>Profile Picture URL</label>
                    <input type="text" className="form-control" placeholder="Enter Image URL" onChange={e => setImageURL(e.target.value)} />
                </div>
                <div id="container" className="form-group">
                    {interests.map(i => <Tag label={i} removeInterest={removeInterest} />)}
                </div>
                <div className="form-group">
                    <label>Interests</label>
                    <input type="text" className="form-control" placeholder="Enter Interests" onKeyUp={e => addInterest(e)} />
                    <small className="form-text text-muted">Press ',' to finish an interest.<br/>Click interests to delete them.</small>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default AddPerson
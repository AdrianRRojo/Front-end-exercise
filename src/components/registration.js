import React, { useEffect } from 'react'
import {useState} from 'react'

import "./style.css"


export default function Registration(){
    // User Information
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [occupation, setOccupation] = useState('')
    const [state, setState] = useState('')

    // Data retrieved from response.data, used to create select options lines 56-70
    const [occupationOptions, setOccupationOptions] = useState([])
    const [stateOptions, setStateOptions] = useState([])

    useEffect(() => {
        fetch("https://frontend-take-home.fetchrewards.com/form")
        .then((response) => response.json())
        .then((data) => {
            // console.log(data)
            setOccupationOptions([...occupationOptions,data.occupations])
            setStateOptions([...stateOptions,data.states])  
        }).catch((err) => {
            console.log(err)
        })
       
    },[])
    // console.log('Occupation ->',occupationOptions[0])
    // console.log('states ->',stateOptions[0])

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "firstName"){
            setFirstName(value);
        }
        if(id === "lastName"){
            setLastName(value);
        }
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
        if(id === "occupation"){
            setOccupation(value);
        }
        if(id === "state"){
            setState(value);
        }


    }

    const handleSubmit  = () => {
        console.log(
            "first -> ", firstName,
            "last -> ", lastName,
            "email -> ", email,
            "password -> ", password,
            "occupation -> ",occupation, 
            "state -> ", state
            );
    }
    return(
        <div>
            <div>
                {/* User info */}
                <form>
                <div>
                  <label htmlFor="firstName">First Name: </label>
                  <input 
                    type="text" id="firstName" placeholder="First Name" 
                    value={firstName} onChange = {(e) => handleInputChange(e)} required/>
                </div>

                <div>
                  <label htmlFor="lastName">last Name: </label>
                  <input 
                    type="text" id="lastName" placeholder="Last Name"
                    value={lastName} onChange = {(e) => handleInputChange(e)}required/>
                </div>
                
                <div>
                  <label htmlFor="email">Email: </label>
                  <input 
                    type="text" id="email" 
                    placeholder="Email" value={email} onChange = {(e) => handleInputChange(e)} required/>
                </div>

                <div>
                
                  <label htmlFor="password">Password: </label>
                  <input 
                    type="text" id="password" placeholder="Password" 
                    value={password} onChange = {(e) => handleInputChange(e)} required/>
                </div>

                <div>
            {/* Using data retrieved from line 19 useEffect to create an option for every occupation and states */}
                <label htmlFor="occupation">Occupation: </label>
                    <select id="occupation"> 
                        {occupationOptions[0].map((occupation, i) => (
                            <option 
                                id="occupation" key={i} 
                                value={occupation} onChange = {(e) => handleInputChange(e)} required>{occupation}</option>
                        ))}
                    </select>
                </div>

                <div>
                <label htmlFor="states">State: </label>
                    <select id="states">
                        {stateOptions[0].map((state, i) => (
                            <option 
                                id="states" key={i} 
                                value={state} onChange = {(e) => handleInputChange(e)} required>{`${state.name}`}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <br/>
                    <button onClick={()=>handleSubmit()} className=" bg-orange-400 hover:bg-orange-500 rounded-full btn " type='submit'>Submit</button>
                    </div>
                </form>
            </div>

        </div>
    )
}
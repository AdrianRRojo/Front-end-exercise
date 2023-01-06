import React, { useEffect } from 'react'
import {useState} from 'react'

import "./style.css"


export default function Registration(){
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [occupation, setOccupation] = useState('')
    const [state, setState] = useState('')

    const [occupationOptions, setOccupationOptions] = useState([])
    const [stateOptions, setStateOptions] = useState([])

    useEffect(() => {

        fetch("https://frontend-take-home.fetchrewards.com/form")
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setOccupationOptions([...occupationOptions,data.occupations])
            setStateOptions([...stateOptions,data.states])
            
        }).catch((err) => {
            console.log(err)
        })
       
    },[])
    console.log('Occupation ->',occupationOptions[0])
    console.log('states ->',stateOptions[0])

    
    return(
        <div>
            <div>
                <form>
                <div>
                  <label htmlFor="fullName">Full Name: </label>
                  <input type="text" id="fullName" placeholder="Full Name" required/>
                  
                </div>
                <div>
                  <label htmlFor="email">Email: </label>
                  <input type="text" id="email" placeholder="Email" required/>
                </div>
                <div>
                  <label htmlFor="password">Password: </label>
                  <input type="text" id="password" placeholder="Password" required/>
                </div>

                <div>
                <label htmlFor="occupation">Occupation: </label>
                    <select id="occupation"> 
                        {occupationOptions[0].map((occupation, i) => (
                            <option id="occupation" key={i}>{occupation}</option>
                        ))}
                    </select>
                </div>
                {/* <div>
                    <label htmlFor="states">State: </label>
                    <select id="states">
                        {stateOptions[0].map((state, i) => (
                            <option id="states" key={i}>{`${state.name}, ${state.}`}</option>
                        ))}
                    </select>
                </div> */}
                <div>
                    <br/>
                    <button className=" bg-orange-400 hover:bg-orange-500 rounded-full btn " type='submit'>Submit</button>
                </div>
                </form>
            </div>

        </div>
    )
}
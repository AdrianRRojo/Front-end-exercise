import React, { useEffect } from 'react'
import {useState} from 'react'
import axios from 'axios'
import "./style.css"

export default function Registration(){
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [occupation, setOccupation] = useState('');
const [state, setState] = useState('');

const [data, setUserData] = useState(null);
const [loading, setLoading] = useState(true); 
const [error, setError] = useState(null);
const [formCompletedMSG, setFormCompletedMSG] = useState('Sign Up')
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('https://frontend-take-home.fetchrewards.com/form', 
            JSON.stringify({name, email, password, occupation, state}),
            {
                headers: { 'Content-Type': 'application/json'}
            }
        );
        setFormCompletedMSG(`Sign up Complete!`)
        setName('');
        setEmail('');
        setPassword('');
        setOccupation('');
        setState('');

        // console.log(
        //     "name -> ", name,
        //     "email -> ", email,
        //     "password -> ", password,
        //     "occupation -> ",occupation, 
        //     "state -> ", state
        //     );
    
    }catch (err) {
       console.warn(err)
    }
};
useEffect(() => {
    const getFormData = async () => {
    try {
        const response = await axios.get("https://frontend-take-home.fetchrewards.com/form");
        setUserData(response.data);
        setError(null);
    } catch (err) {
        setError(err.message);
        setUserData(null);
    } finally {
        setLoading(false);
    }
    };
        getFormData();
}, []);

return (
    <div>
        { !error && !loading && (
            <div>
                    <div className='div1'>
                        <form onSubmit={handleSubmit} className='formBox'>

                            <div>
                                <br></br>
                                <label htmlFor='name'> Name: </label>
                                <input type='text' id='name' placeholder='Full Name' value={name} onChange={ (e) => setName(e.target.value) } required/>
                            </div>

                            <div>
                                <label> Email: </label>
                                <input type='email' id='email' placeholder='Email' value={email} onChange={ (e) => setEmail(e.target.value) } required/>
                            </div>

                            <div>
                                <label> Password: </label>
                                <input type='password' id='password' placeholder='Password' value={password} onChange={ (e) => setPassword(e.target.value) } required/>
                            </div>

                            <div>
                                <select id='occupation' value={occupation} onChange={ (e) => setOccupation(e.target.value)} required>
                                    <option value="">Select an Occupation</option>
                                        { data.occupations.map((occupation) => (
                                            <option key={occupation} value={occupation}>{occupation} </option>
                                        ))}
                                </select>
                            </div>

                            <div>  
                                <select id="state" value={state} onChange={(e) => setState(e.target.value)} required>
                                    <option value="">Select your State</option>
                                        { data.states.map((states) => (
                                            <option key={states.name} value={state.name}> {states.name} </option>
                                        ))}
                                </select>
                            </div>
                                <button type='submit'className="bg-orange-400 hover:bg-orange-500 rounded-full btn"> {formCompletedMSG}</button>
                            </form>
                        </div>
                    </div>
        )}
    </div>
)
}
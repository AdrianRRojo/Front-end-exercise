import React, { useEffect } from 'react'
import {useState} from 'react'
import axios from 'axios'
import "./style.css"



// export default function Registration(){
//     // User Information
//     const [firstName, setFirstName] = useState('')
//     const [lastName, setLastName] = useState('')
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [occupation, setOccupation] = useState('')
//     const [state, setState] = useState('')

//     // Data retrieved from response.data, used to create select options lines 56-70
//     const [occupationOptions, setOccupationOptions] = useState([])
//     const [stateOptions, setStateOptions] = useState([])

//     useEffect(() => {
//         fetch("https://frontend-take-home.fetchrewards.com/form")
//         .then((response) => response.json())
//         .then((data) => {
//             // console.log(data)
//             setOccupationOptions([...occupationOptions,data.occupations])
//             setStateOptions([...stateOptions,data.states])  
//         }).catch((err) => {
//             console.log(err)
//         })
    
//     },[])
//     // console.log('Occupation ->',occupationOptions[0])
//     // console.log('states ->',stateOptions[0])

//     const handleInputChange = (e) => {
//         const {id , value} = e.target;
//         if(id === "firstName"){
//             setFirstName(value);
//         }
//         if(id === "lastName"){
//             setLastName(value);
//         }
//         if(id === "email"){
//             setEmail(value);
//         }
//         if(id === "password"){
//             setPassword(value);
//         }
//         if(id === "occupation"){
//             setOccupation(value);
//         }
//         if(id === "state"){
//             setState(value);
//         }


//     }

//     const handleSubmit  = () => {
//         console.log(
//             "first -> ", firstName,
//             "last -> ", lastName,
//             "email -> ", email,
//             "password -> ", password,
//             "occupation -> ",occupation, 
//             "state -> ", state
//             );
//     }
//     return(
        
//         <div>
//             <div>
//                 {/* User info */}
//                 <form>
//                 <div>
//                   <label htmlFor="firstName">First Name: </label>
//                   <input 
//                     type="text" id="firstName" placeholder="First Name" 
//                     value={firstName} onChange = {(e) => handleInputChange(e)} required/>
//                 </div>

//                 <div>
//                   <label htmlFor="lastName">last Name: </label>
//                   <input 
//                     type="text" id="lastName" placeholder="Last Name"
//                     value={lastName} onChange = {(e) => handleInputChange(e)}required/>
//                 </div>
                
//                 <div>
//                   <label htmlFor="email">Email: </label>
//                   <input 
//                     type="text" id="email" 
//                     placeholder="Email" value={email} onChange = {(e) => handleInputChange(e)} required/>
//                 </div>

//                 <div>
                
//                   <label htmlFor="password">Password: </label>
//                   <input 
//                     type="text" id="password" placeholder="Password" 
//                     value={password} onChange = {(e) => handleInputChange(e)} required/>
//                 </div>

//                 <div>
//             {/* Using data retrieved from line 19 useEffect to create an option for every occupation and states */}
//                 <label htmlFor="occupation">Occupation: </label>
//                     <select id="occupation"> 
//                         {occupationOptions[0].map((occupation, i) => (
//                             <option 
//                                 id="occupation" key={i} 
//                                 value={occupation} onChange = {(e) => handleInputChange(e)} required>{occupation}</option>
//                         ))}
//                     </select>
//                 </div>

//                 <div>
//                 <label htmlFor="states">State: </label>
//                     <select id="states">
//                         {stateOptions[0].map((state, i) => (
//                             <option 
//                                 id="states" key={i} 
//                                 value={state} onChange = {(e) => handleInputChange(e)} required>{`${state.name}`}</option>
//                         ))}
//                         {}
//                     </select>
//                 </div>

//                 <div>
//                     <br/>
//                     <button onClick={()=>handleSubmit()} className=" bg-orange-400 hover:bg-orange-500 rounded-full btn " type='submit'>Submit</button>
//                     </div>
//                 </form>
//             </div>

//         </div>
//     )
// }

export default function Registration(){
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [occupation, setOccupation] = useState('');
const [state, setState] = useState('');

const [data, setUserData] = useState(null);
const [loading, setLoading] = useState(true); 
const [error, setError] = useState(null);

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('https://frontend-take-home.fetchrewards.com/form', 
            JSON.stringify({name, email, password, occupation, state}),
            {
                headers: { 'Content-Type': 'application/json'}
            }
        );
        // console.log(response.data);
        // console.log(JSON.stringify(response));
        
        setName('');
        setEmail('');
        setPassword('');
        setOccupation('');
        setState('');

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
        { !loading && !error && (
            <div>
                <div>
                <div>
                    <div>
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label> Full Name </label>
                                    <input type='text' id='name' value={name} onChange={ (e) => setName(e.target.value) } required/>
                                </div>

                                <div>
                                    <label> Email </label>
                                    <input type='email' id='email' value={email} onChange={ (e) => setEmail(e.target.value) } required/>
                                </div>

                                <div>
                                    <label> Password </label>
                                    <input type='text' id='password' value={password} onChange={ (e) => setPassword(e.target.value) } required/>
                                </div>

                                <div>
                                    <select id='occupation' value={occupation} onChange={ (e) => setOccupation(e.target.value)} required>
                                        <option value="">Select an Occupation</option>
                                            { data.occupations.map((occupation) => (
                                                <option key={occupation} value={occupation}>
                                                    {occupation}
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                <div>
                                    <label >State</label>
                                    <select id="state" value={state} onChange={(e) => setState(e.target.value)} required>
                                        <option value="">Select your State</option>
                                            { data.states.map((states) => (
                                                <option key={states.name} value={state.name}>
                                                    {states.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <button type='submit'className="bg-orange-400 hover:bg-orange-500 rounded-full btn"> Submit </button>
                            </form>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )}
    </div>
)
}
import React from 'react'
import {useStaet} from 'react'

import "./style.css"

export default function Registration(){
    return(
        <div>
            <div>
                <div>
                  <label for="fullName">Full Name: </label>
                  <input type="text" id="fullName" placeholder="Full Name" required/>
                </div>
                <div>
                  <label for="email">Email: </label>
                  <input type="text" id="email" placeholder="Email" required/>
                </div>
                <div>
                  <label for="password">Password: </label>
                  <input type="text" id="password" placeholder="Password" required/>
                </div>
                {/* <div>
                  <label for="Occupation">Occupation</label>
                  <input type="text" id="Occupation" placeholder="Occupation" required/>
                </div> */}
                  <div>
                  <label for="state">State: </label>
                  <input type="text" id="state" placeholder="State" required/>
                </div>
                <div>
                    <br/>
                    <button className=" bg-orange-400 hover:bg-orange-500 rounded-full btn " type='submit'>Submit</button>
                </div>
            </div>
        </div>
    )
}
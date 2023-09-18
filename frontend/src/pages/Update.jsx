import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import Packs from './Packs';

export default function Update() {


    const navigate = useNavigate();
    const location = useLocation();

    // console.log(location)

    const packId = location.pathname.split("/")[2];

    // console.log("This pack ID is: " + packId);

    const [pack, setPack] = useState({
        title: "",
        description: "",
        price: null,
        cover: "",
        link: "",
    });

    function handleChange(event){
        setPack(prevPack =>({
                ...prevPack, [event.target.name]: event.target.value
            }
        ));
    }

    async function handleClick(event){
        event.preventDefault();

        try{
            await axios.put("http://localhost:8080/sample-packs/" + packId, pack);
            console.log("http://localhost:8080/sample-packs/" + packId);
            navigate("/");
        }
        catch(err){
            console.log(err)
        }
    }

    // console.log(pack);
  return (
    <div>
        <div className='form'>
            <h1>Update Sample Pack Information</h1>
            <input type="text" placeholder="Update Title" onChange={handleChange} name='title'/>
            <input type="text" placeholder='Update Description' onChange={handleChange} name='description'/>
            <input type="number" inputMode='decimal' step="0.01" placeholder='Update Price' onChange={handleChange} name='price'/>
            <input type="text" placeholder='Enter Cover Image URL' onChange={handleChange} name='cover'/>
            <input type="text" placeholder='Add Website URL' onChange={handleChange} name='link'/>
            <a className='update' onClick={handleClick}>Update</a>
            <a className='add-pack-button'><Link to="/">Go Back</Link></a>
        </div>
        {console.log(pack)}
    </div>
  )
}

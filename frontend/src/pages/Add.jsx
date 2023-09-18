import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Add() {

    const navigate = useNavigate();

    const [pack, setPack] = useState({
        title:"",
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
            await axios.post("http://localhost:8080/sample-packs", pack);
            navigate("/");
        }
        catch(err){
            console.log(err)
        }
    }

    console.log(pack);

  return (
    <div className='form'>
        <h1>Add a New Sample Pack</h1>
        <input type="text" placeholder='Enter Title' onChange={handleChange} name='title'/>
        <input type="text" placeholder='Enter Description' onChange={handleChange} name='description'/>
        <input type="number" inputMode='decimal' step="0.01" placeholder='Enter Price' onChange={handleChange} name='price'/>
        <input type="text" placeholder='Add Cover Image URL' onChange={handleChange} name='cover'/>
        <input type="text" placeholder='Add Website URL' onChange={handleChange} name='link'/>
        <a className='update' onClick={handleClick}>Add</a>
        <a className='add-pack-button'><Link to="/">Go Back</Link></a>
    </div>
  )
}

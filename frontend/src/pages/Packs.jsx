import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

var samplePacks;

export default function Packs() {

    const [packs, setPacks] = useState([]);

    useEffect(function(){
        async function fetchAllPacks(){
            try{
                const res = await axios.get("http://localhost:8080/sample-packs");
                setPacks(res.data);
            }
            catch(err){
                console.log(err);
            }
        }

        fetchAllPacks();
    },[]);

    async function handleDelete(id){
        try{
            await axios.delete("http://localhost:8080/sample-packs/"+ id);
            window.location.reload();
        }
        catch(err){
            console.log(err);
        }
    }


  return (
    <div>
        <h1>PrxducerHub</h1>
        <div className="packs">
            {packs.map((pack)=>(
                <div className='pack' key={pack.id}>
                    <a href={pack.link} target='_blank'><img src={pack.cover} alt=''/></a>
                    <h3>{pack.title}</h3>
                    <p>{pack.description}</p>
                    <span>- ${pack.price} -</span>
                    <a className='delete' onClick={function(){handleDelete(pack.id)}}>Delete</a>
                    <a className='update'><Link to={`/update/${pack.id}`}>Update</Link></a>
                </div>
            ))}
        </div>
        <a className='add-pack-button'>
            <Link className="add-pack-link" to="/add">Add a Sample Pack</Link>
        </a>
    </div>
  )
}

console.log(samplePacks);

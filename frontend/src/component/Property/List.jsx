import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import NoImage from "../Images/NoImage.png"

const List = ({properties}) => {
  return (
    <>
        {
           properties && properties.map((currentData)=>{
                return (
                    
                        <div className="" key={currentData._id}> 
                            <div>
                            <Link to={`/properties/${currentData._id}`} className="text-decoration-none" >
                                <div className="card mb-3 m-auto" style={{"max-width": "80rem"}}>
                                    <div className="row g-4">
                                    
                                        <div className="col-md-4">

                                            <img src={ currentData.images[0] ? `${currentData.images[0]?.url}` : NoImage} className="img-fluid rounded-start" alt="..." width="350" />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title text-dark">{currentData.name}</h5>
                                                <p className='card-text'>
                                                   {currentData.price}
                                                </p>
                                                <p className='card-text'>
                                                    {currentData.address?.street}
                                                    , {currentData.address?.city}
                                                    ,  {currentData.address?.state}
                                                    ,{currentData.address?.zip}


                                                </p>
                                                <div className=" ">
                                                <Button variant="contained" className="me-4 my-3">Show</Button>
                                                <Button variant="outlined" href="#contained-buttons">Schedule</Button>
                                                </div>
                                            </div>
                                        </div>
                                    
                                    </div>
                                </div>
                            </Link>
                            </div>
                        </div>
                )
            })
        }

    </>
  )
}

export default List





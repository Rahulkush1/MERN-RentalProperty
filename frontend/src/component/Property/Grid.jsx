import React from 'react'
import PropCard from '../Helper/Card'

const Grid= ({properties}) => {
  return (
    <>
        {
            properties && properties.map((currentData,index)=>{
                return (
                    <>
                        <div className="col-lg-3  col-md-4 col-6">
                            <PropCard data = {currentData} key={currentData._id} />
                        </div>
                    </>
                )
            })
        }
    </>
  )
}

export default Grid

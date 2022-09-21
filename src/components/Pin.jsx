import React from 'react'
import { urlFor } from '../container/client'

const Pin = ({pin: {postedBy, image, _id, destenation}}) => {
  return (
    <div>
      <img src={urlFor(image).width(250).url()} alt="user-post" className='rounded-lg w-full '/>
    </div>
  )
}

export default Pin
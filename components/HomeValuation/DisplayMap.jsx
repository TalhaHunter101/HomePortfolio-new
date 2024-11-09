import React from 'react'
import { ValuationMapStatic } from '../Maps/index'

function DisplayMap({defaultProps}) { 
  return (
    <div className='h-64'>

    <ValuationMapStatic height={500} center={defaultProps}/>
    </div>
  )
}

export default DisplayMap
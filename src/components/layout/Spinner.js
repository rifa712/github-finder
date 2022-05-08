import React from 'react'
import anim from './spinner.gif'

const Spinner = () => {
  return (
    <>
      <img
        src={anim}
        alt='Loafing...'
        style={{ width: '200px', margin: 'auto', display: 'block' }}
      />
    </>
  )
}

export default Spinner

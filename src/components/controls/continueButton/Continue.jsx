import React from 'react'
import styles from './Continue.module.css'
const Continue = ({handleContinueClick}) => {
  return (
    <div className='mx-auto m-3'>
      <button type="button" className= {`btn btn-success ${styles.continueBtn} fs-2`} onClick={handleContinueClick}>Continue</button>
    </div>
  )
}

export default Continue;

import React from 'react'
import styles from './Reset.module.css'
const Reset = ({handleResetClick}) => {
  return (
    <div className='mx-auto m-3'>
      <button type="button" className= {`btn btn-danger ${styles.resetBtn} fs-2`} onClick={handleResetClick}>Reset</button>
    </div>
  )
}

export default Reset;

import React from 'react'
import styles from './Start.module.css'
const Start = ({handleStartClick}) => {
  return (
    <div className={`mx-auto m-3 ${styles.startBtn}`}>
      <button type="button" className='btn btn-success fs-2' onClick={handleStartClick}>Start</button>
    </div>
  )
}

export default Start;

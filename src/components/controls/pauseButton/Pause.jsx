import React from 'react'
import styles from './Pause.module.css'
const Pause = ({handlePauseClick}) => {
  return (
    <div className='mx-auto m-3'>
      <button type="button" className= {`btn btn-warning fs-2 ${styles.pauseBtn}`} onClick={handlePauseClick}>Pause</button>
    </div>
  )
}

export default Pause;

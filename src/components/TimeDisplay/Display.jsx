import React from 'react'
import styles from './Display.module.css'
const Display = React.memo(({mSec, sec, min, hr}) => {
  return (
    <div>
      <div className={`card text-center p-5`}>
            <h1 className='fs-1'>
              {String(hr).padStart(2, '0')} : {String(min).padStart(2, '0')} : {String(sec).padStart(2, '0')} : {String(mSec).padStart(3, '0')}
            </h1>
      </div>
    </div>
  )
});

export default Display

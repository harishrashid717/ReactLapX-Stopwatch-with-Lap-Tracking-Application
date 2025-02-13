import styles from './Lap.module.css'
const Lap = ({handleLapClick})=>{
  return (
    <div className='mx-auto m-3'>
      <button type="button" className= {`btn btn-primary ${styles.lapBtn} fs-2`} onClick={handleLapClick}>Lap</button>
    </div>
  )
}

export default Lap;

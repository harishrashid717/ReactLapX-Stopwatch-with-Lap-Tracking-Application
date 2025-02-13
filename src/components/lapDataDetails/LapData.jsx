import styles from './LapData.module.css'
function LapData(){
    const dataArray = JSON.parse(localStorage.getItem('dataArray')) || [];
    return(
        <div className={`container ${styles.lapDataContainer}`}>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">Laps</th>
                        <th scope="col">Lap Time</th>
                        <th scope="col">Elapsed Time</th>
                        <th scope="col">Lap Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {
                       dataArray.map((obj, index)=>(
                        <tr key={index}>
                            <td>{obj.row}</td>
                            <td>{obj.lapTime}</td>
                            <td>{obj.elapsedTime}</td>
                            <td>{obj.currentTimeDate}</td>
                        </tr>
                       )) 
                    }
                </tbody>
            </table>
        </div>
    )
}
export default LapData;
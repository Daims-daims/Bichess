
interface Props{
    countdown : number
}

function Clock({countdown}:Props){
    return <div className="clock">{Math.floor(countdown/60).toLocaleString("fr-fr",{minimumIntegerDigits:2})}:{(countdown%60).toLocaleString("fr-fr",{minimumIntegerDigits:2})}</div>
}

export default Clock
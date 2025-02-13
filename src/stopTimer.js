export function getTime(milisec){
    const mSec = (milisec%1000);
    const sec = Math.floor((milisec/1000) % 60);
    const min = Math.floor((milisec/(1000*60)) % 60);
    const hr = Math.floor((milisec/(1000*60*60)) % 12);

    return [hr, min, sec, mSec];

}
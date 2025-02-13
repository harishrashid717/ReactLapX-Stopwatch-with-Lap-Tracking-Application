export function currentDateTime(){
    let options = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true, 
        timeZoneName: 'short' 
    };
    let formattedDate = new Date().toLocaleString('en-US', options);
    formattedDate = formattedDate.replace(',', '-')
    return formattedDate;
}

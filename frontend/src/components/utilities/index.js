export function ErrorMapper({errArray}){
    return (
        <ul>
                {errArray.map((err) => <li key={err}>{err}</li>)}
        </ul>
    )
}

export function dateFormatter(start, end){
    const daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const months = ["January","February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


    const startArray = start.split("-")
    const lengthOfStay = (new Date(end).getTime() - new Date(start).getTime())/86400000
    const currentDay = daysOfTheWeek[new Date(start).getDay()]



    return(`${currentDay}, ${months[+(startArray[1]) - 1]} ${startArray[2]} for ${lengthOfStay} nights`)
}

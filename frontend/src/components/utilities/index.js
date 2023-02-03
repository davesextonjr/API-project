export function ErrorMapper({errArray}){
    return (
        <ul>
                {errArray.map((err) => <li key={err}>{err}</li>)}
        </ul>
    )
}

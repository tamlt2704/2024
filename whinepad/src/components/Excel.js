import './Excel.css'

export default function Excel({headers, initialData}) {
    return (
        <div className='Excel'>
        <table>
            <thead>
                {
                headers.map((title) => {
                    return (
                        <td> {title} </td>
                    );
                })
                }
            </thead>

            <tbody>
                {initialData.map((row, rowIdx) => {
                    return (
                        <tr>
                            {row.map((cell) => {
                                return (<td> {cell} </td>);
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </div>
    )
}
import style from './Table.module.scss'

type ColumnType<T> = {
    header: string,
    render: (item: T) => React.ReactNode
}

type TableProps<T> = {
    columns: ColumnType<T>[],
    data: T[],
    keyExtractor: (item: T) => string | number
}

function Table<T>({data, columns, keyExtractor} : TableProps<T>) {
    return (
        <table className={style.table}>
            <thead>
                <tr>
                    {columns.map((col, i) => {
                        return (
                            <th className={style.tableHeader} key={i}>{col.header}</th>
                        )
                    })
                    }
                </tr>
            </thead>
            <tbody>
                {data.map((el) => {
                    return (
                        <tr key={keyExtractor(el)}>
                            {columns.map((col, i) => {
                                return (
                                    <td className={style.tableBodyColumn} key={i}>{col.render(el)}</td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Table
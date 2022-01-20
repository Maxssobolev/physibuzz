import React, { useEffect, useState } from 'react'
import { ReactTabulator } from 'react-tabulator'



export default function TableWithPagination({ columns, initialRowData, showEntries, maxOnPage }) {

    const [rowData, setRowData] = useState(initialRowData)
    showEntries = showEntries || false
    //подписываемся на изменение initialState (используется для удаления)
    useEffect(() => {
        setRowData(initialRowData)
        setConfig((prev) => ({
            ...prev,
            data: initialRowData
        }))
    }, [initialRowData])


    //selector
    const selectShowEntries = [10, 25, 50, 100]
    //-------

    const [config, setConfig] = useState({
        data: rowData,
        columns,
        layout: "fitColumns",
        options: {
            placeholder: "<span class='noDataAvailable'>No data available in table</span>",
            pagination: 'local',
            paginationSize: maxOnPage,
            resizableColumns: false,
            height: '100%',

        }
    })
    //-------

    //SEARCH
    const [term, setTerm] = useState('')
    const update = (config) => {
        //in config: term, data (filtred)
        setTerm(config.term)
        setConfig((prev) => ({
            ...prev,
            data: config.data
        }))
    }
    return (
        <div className="listAllContent">
            {/* TABLE */}
            {showEntries != false &&
                <div className="itemsPerPageSelect">
                    <span>Show</span>
                    <select name="itemsPerPage" onChange={(e) => {
                        setConfig((prev) => ({
                            ...prev,
                            options: {
                                pagination: 'local',
                                paginationSize: e.target.value
                            }
                        }))
                    }}>
                        {selectShowEntries.map((val) =>
                            <option
                                value={val}
                                key={`${val}__itemsPerPageContactsList`}
                                {...(
                                    val == config.options.paginationSize ?
                                        { defaultValue: 'yes' }
                                        :
                                        null
                                )}
                            >{val}</option>)}
                    </select>
                    <span>entries</span>
                </div>
            }
            <ReactTabulator {...config} />

        </div>
    )
}
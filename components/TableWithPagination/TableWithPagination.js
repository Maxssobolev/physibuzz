import React, { useEffect, useState } from 'react'
import { ReactTabulator } from 'react-tabulator'
import { useWindowDimensions } from '../CommonUtils/useWindowDimensions'
import Search from '../Search/Search'


function TableWithPagination({ columns, initialRowData, showEntries, maxOnPage, searchField, customSearchWrapperClass, searchPlaceholder, customSearchInputClass, specialId, filtredOptions }) {
    const isMobile = useWindowDimensions().width <= 425

    showEntries = showEntries || false
    searchField = searchField || false
    filtredOptions = filtredOptions || { data: [], column: '' }

    const config = {
        columns,
        layout: "fitColumns",
        options: {
            placeholder: "<span class='noDataAvailable'>No data available in table</span>",
            pagination: 'local',
            paginationSize: maxOnPage,
            resizableColumns: false,
            height: '100%',
        }
    }
    const [rowData, setRowData] = useState(initialRowData)

    //SEARCH
    const [term, setTerm] = useState('')
    const update = (config) => {
        //in config: term, data (filtred)
        setTerm(config.term)
        setRowData(config.data)
    }

    //подписываемся на изменение initialState (используется для удаления)
    useEffect(() => {
        setRowData(initialRowData)
    }, [initialRowData])

    return (
        <div className="listAllContent">
            {((filtredOptions.data.length > 0) || (searchField != false)) &&
                (<div className="table-controllers">
                    {(filtredOptions.data.length > 0) && (
                        <div>
                            <select
                                className="field field_select field_select-inTable"
                                onChange={(e) => {

                                    setRowData(
                                        //                                                         оставить, если подстрока из заданной ячейки содержит выбранное значение селекта
                                        e.target.value != 'All' ? initialRowData.filter((itm) => { return itm[filtredOptions.column].toLowerCase().includes(e.target.value.toLowerCase()) }) : initialRowData
                                    )
                                }}
                            >
                                {filtredOptions.data.map((obj) => { return <option value={obj.value} key={`${obj.value}__tableGroupSelect2`}>{obj.label}</option> })}
                            </select>
                        </div>
                    )}

                    {(searchField != false) &&
                        <div className={customSearchWrapperClass}>
                            <Search
                                placeholder={searchPlaceholder != undefined ? searchPlaceholder : "Search by title"}
                                customClasses={customSearchInputClass}
                                data={initialRowData}
                                term={term}
                                update={update}
                                searchField={searchField}
                            />
                        </div>
                    }
                </div>)}
            {/* TABLE */}
            <div className={isMobile ? 'table-wrapper-mobile' : ''}>
                <ReactTabulator
                    {...config}
                    {...(specialId != undefined ? { id: specialId } : {})}
                    data={rowData}
                />
            </div>

        </div>
    )
}

export default TableWithPagination
import { useState } from "react"
import TableWithPagination from "../../TableWithPagination/TableWithPagination"

export default function SettingsTransactionHistoryTab({ title }) {
    const [data, setData] = useState([
        { transactionID: '8271883', date: '06-20-2020', amount: '$25' },
        { transactionID: '827112883', date: '06-20-2020', amount: '$25' },
        { transactionID: '82731883', date: '06-20-2020', amount: '$25' },
        { transactionID: '8271883', date: '06-20-2020', amount: '$25' },
        { transactionID: '82171883', date: '06-20-2020', amount: '$25' },
        { transactionID: '8271883', date: '06-20-2020', amount: '$25' },
        { transactionID: '82371883', date: '06-20-2020', amount: '$25' },
        { transactionID: '82711883', date: '06-20-2020', amount: '$25' },
        { transactionID: '8271883', date: '06-20-2020', amount: '$25' },
        { transactionID: '8271231883', date: '06-20-2020', amount: '$25' },
        { transactionID: '8212371883', date: '06-20-2020', amount: '$25' },
        { transactionID: '8271883', date: '06-20-2020', amount: '$25' },
        { transactionID: '83271883', date: '06-20-2020', amount: '$25' },
        { transactionID: '8271883', date: '06-20-2020', amount: '$25' },
        { transactionID: '82123471883', date: '06-20-2020', amount: '$25' },
        { transactionID: '8271883', date: '06-20-2020', amount: '$25' },
        { transactionID: '8271883', date: '06-20-2020', amount: '$25' },
        { transactionID: '8274121883', date: '06-20-2020', amount: '$25' },
        { transactionID: '82271883', date: '06-20-2020', amount: '$25' },
        { transactionID: '8271883', date: '06-20-2020', amount: '$25' },
        { transactionID: '823S71883', date: '06-20-2020', amount: '$25' },

    ])

    const columns = [
        { title: 'Transaction ID', field: 'transactionID', headerSort: false },
        { title: 'Date', field: 'date', headerSort: false },
        { title: 'Amount', field: 'amount', headerSort: false },

    ]
    return (
        <>
            <div className="settings-tab-header">
                {title}
            </div>
            <div className="settings-tab-content">
                <TableWithPagination columns={columns} initialRowData={data} maxOnPage={8} />
            </div>
        </>
    )
}
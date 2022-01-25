import { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import { LOGGEDIN_EMPLOYER } from '../../components/Header/HeadersVariants'
import TableWithPagination from '../../components/TableWithPagination/TableWithPagination'
import { reactFormatter } from 'react-tabulator'
import MoreAction from '../../assets/img/icons/more-action.svg'

export default function EmployerJobs() {
    const [employersJobs, setEmployersJobs] = useState([])

    useEffect(() => {
        setEmployersJobs([{
            id: '1',
            jobTitle: 'Five Tips For Low Cost Holidays',
            jobDesc: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            location: 'Irland',
            created: '06-29-2020',
            candidates: '20 Candidates',
            views: '50',
            budget: '$ 3500',
            status: 'Opened'
        },
        {
            id: '2',
            jobTitle: 'Five Tips For Low Cost Holidays',
            jobDesc: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Tristique senectus et netus et malesuada fames ac turpis egestas.',
            location: 'Irland',
            created: '06-29-2020',
            candidates: '20 Candidates',
            views: '50',
            budget: '$ 3500',
            status: 'Closed'
        },
        {
            id: '3',
            jobTitle: 'Four Tips For High Cost Holidays',
            jobDesc: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Tristique senectus et netus et malesuada fames ac turpis egestas.',
            location: 'Irland',
            created: '06-29-2020',
            candidates: '20 Candidates',
            views: '50',
            budget: '$ 3500',
            status: 'Closed'
        },
        {
            id: '4',
            jobTitle: 'Four Tips For High Cost Holidays',
            jobDesc: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Tristique senectus et netus et malesuada fames ac turpis egestas.',
            location: 'Irland',
            created: '06-29-2020',
            candidates: '20 Candidates',
            views: '50',
            budget: '$ 3500',
            status: 'Opened'
        },
        {
            id: '5',
            jobTitle: 'Seven Tips For High Cost Holidays',
            jobDesc: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Tristique senectus et netus et malesuada fames ac turpis egestas.',
            location: 'Irland',
            created: '06-29-2020',
            candidates: '20 Candidates',
            views: '50',
            budget: '$ 3500',
            status: 'Opened'
        }])
    }, [])

    function ActionGroup(props) {
        const [isActionMenuOpen, setIsActionMenuOpen] = useState(false)
        const cellData = props.cell._cell.row.data;
        const id = cellData.id
        return (
            <div className="header-rightside__user user-dropdown action-group" tabIndex={0} onClick={() => setIsActionMenuOpen(!isActionMenuOpen)} onBlur={() => setTimeout(() => setIsActionMenuOpen(false), 100)} >
                <div className="user-dropbtn"><MoreAction width={5} /></div>
                <div className="user-dropdown-content" style={{
                    display: isActionMenuOpen ? 'block' : 'none',
                }} >
                    <div className='action-group__content'><button type='button' >Edit Job</button></div>
                    <div className='action-group__content'><button type='button' >Close Job</button></div>
                    <div className='action-group__content'><button type='button' >Pause Job</button></div>
                </div>
            </div>
        );

    }

    function JobTitle(props) {
        const cellData = props.cell._cell.row.data;
        return (
            <div className="table__jobColumn">
                <div className="table__jobColumn-title">{cellData.jobTitle}</div>
                <div className="table__jobColumn-desc">{cellData.jobDesc.slice(0, 100)}{cellData.jobDesc.length > 99 && '...'}</div>
            </div>
        );

    }

    const columns = [
        {
            title: 'Job', field: 'jobTitle', headerSort: false,
            formatterParams: (cell) => ({ jobDesc: cell.getData()?.jobDesc, id: cell.getData()?.id }),
            formatter: reactFormatter(<JobTitle />),
            widthGrow: 3,
            vertAlign: 'middle',
            headerHozAlign: 'left'
        },
        { title: 'Location', field: 'location', headerSort: false, vertAlign: 'middle', hozAlign: 'center', headerHozAlign: 'center' },
        { title: 'Created', field: 'created', headerSort: false, vertAlign: 'middle', hozAlign: 'center', headerHozAlign: 'center' },
        {
            title: 'Candidates', field: 'candidates', headerSort: false,
            formatter: function (cell, formatterParams, onRendered) {
                return "<span style='color: var(--accent)'>" + cell.getValue() + '</span>';
            },
            vertAlign: 'middle',
            hozAlign: 'center', headerHozAlign: 'center'

        },
        { title: 'Views', field: 'views', headerSort: false, vertAlign: 'middle', hozAlign: 'center', headerHozAlign: 'center' },
        { title: 'Budget', field: 'budget', headerSort: false, vertAlign: 'middle', hozAlign: 'center', headerHozAlign: 'center' },
        {
            title: 'Status', field: 'status', headerSort: false, vertAlign: 'middle', hozAlign: 'center',
            formatter: function (cell, formatterParams, onRendered) {
                if (cell.getValue().toLowerCase() == 'opened')
                    return "<span style='color: #6DD400'>" + cell.getValue() + '</span>';
                else
                    return "<span style='color: #ff3347'>" + cell.getValue() + '</span>';
            }, headerHozAlign: 'center'
        },
        {
            title: '', field: 'actions', width: 50, headerSort: false,
            vertAlign: 'top', hozAlign: 'center',
            formatterParams: (cell) => ({ id: cell.getData().id }),
            formatter: reactFormatter(<ActionGroup />)
        }

    ]

    if (employersJobs.length == 0) {
        return (
            <>
                <Header variant={LOGGEDIN_EMPLOYER} />
                <div className="page page-employer page-employer_jobs">
                    <div className="table-wrapper">
                        <div className='loaderForTables'>Loading...</div>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <Header variant={LOGGEDIN_EMPLOYER} />
            <div className="page page-employer page-employer_jobs">
                <div className="table-wrapper">
                    <TableWithPagination
                        initialRowData={employersJobs}
                        columns={columns}
                        searchField='jobTitle'
                        maxOnPage={4}
                        specialId={'tabulator-employer-jobs'}
                        filtredOptions={{
                            data: [
                                { label: 'All', value: 'All' }, ,
                                { label: 'Open Jobs', value: 'opened' },
                                { label: 'Close Jobs', value: 'closed' }
                            ],
                            column: 'status'
                        }}

                    />
                </div>
            </div>
        </>
    )
}
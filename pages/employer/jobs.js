import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Header from '../../components/Header/Header'
import TableWithPagination from '../../components/TableWithPagination/TableWithPagination'
import { reactFormatter } from 'react-tabulator'
import MoreAction from '../../assets/img/icons/more-action.svg'
import api from '../../apiConfig'
export default function EmployerJobs() {
    const router = useRouter()
    const [employersJobs, setEmployersJobs] = useState([])
    useEffect(() => {

        api.get('/api/v1/vacancies/my').then(r => {
            console.log(r.data.data.data)
            setEmployersJobs(r.data.data.data)
        })

    }, [])

    const editStatus = (cellData, status) => {
        const {
            id,
            title,
            description,
            country,
            //country_iso_code,
            city,
            state,
            address,
            profession_id,
            hourly_min_pay,
            hourly_max_pay,
            annual_min_pay,
            annual_max_pay,
            currency_id,
        } = cellData
        api.put(`/api/v1/vacancies/${id}`,
            {
                title,
                description,
                country,
                //country_iso_code,
                city,
                state,
                address,
                profession_id,
                hourly_min_pay,
                hourly_max_pay,
                annual_min_pay,
                annual_max_pay,
                currency_id,
                active: status == 'closed' ? '0' : '1',
                status
            }
        ).then(r => {
            console.log(r)

        })
    }



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
                    <div className='action-group__content'><button type='button' onClick={() => router.push(`/employer/postJob?id=${encodeURIComponent(id)}`)}>Edit Job</button></div>
                    <div className='action-group__content'><button type='button' onClick={() => editStatus(cellData, 'closed')} >Close Job</button></div>
                    <div className='action-group__content'><button type='button' onClick={() => editStatus(cellData, 'opened')}>Open Job</button></div>
                </div>
            </div>
        );

    }

    function JobTitle(props) {
        const cellData = props.cell._cell.row.data;
        return (
            <div className="table__jobColumn">
                <div className="table__jobColumn-title">{cellData.title}</div>
                <div className="table__jobColumn-desc">{cellData.description.slice(0, 100)}{cellData.description.length > 99 && '...'}</div>
            </div>
        );

    }

    const columns = [
        {
            title: 'Job', field: 'title', headerSort: false,
            formatterParams: (cell) => ({ description: cell.getData()?.description, id: cell.getData()?.id }),
            formatter: reactFormatter(<JobTitle />),
            widthGrow: 3,
            vertAlign: 'middle',
            headerHozAlign: 'left'
        },
        { title: 'Location', field: 'country', headerSort: false, vertAlign: 'middle', hozAlign: 'center', headerHozAlign: 'center' },
        { title: 'Created', field: 'created_at', headerSort: false, vertAlign: 'middle', hozAlign: 'center', headerHozAlign: 'center' },
        {
            title: 'Candidates', field: 'candidates_count', headerSort: false,
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
                else if (cell.getValue().toLowerCase() == 'closed')
                    return "<span style='color: #ff3347'>" + cell.getValue() + '</span>';
                else
                    return "<span style='color: var(--gray)'>" + cell.getValue() + '</span>';

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
                <Header />
                <div className="page page-employer page-employer_jobs">
                    <div className="table-wrapper">
                        <div className='loaderForTables'>No data available</div>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <Header />
            <div className="page page-employer page-employer_jobs">
                <div className="table-wrapper">
                    <TableWithPagination
                        initialRowData={employersJobs}
                        columns={columns}
                        searchField='title'
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
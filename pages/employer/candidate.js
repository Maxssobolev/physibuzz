import { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import { LOGGEDIN_EMPLOYER } from '../../components/Header/HeadersVariants'
import TableWithPagination from '../../components/TableWithPagination/TableWithPagination'
import { reactFormatter } from 'react-tabulator'
import MoreAction from '../../assets/img/icons/more-action.svg'
import { getCountryFlag } from '../../components/CommonUtils/getCountryFlag'

export default function EmployerCadidate() {
    const [employersCandidate, setEmployersCandidate] = useState([])

    useEffect(() => {
        setEmployersCandidate([{
            id: '1',
            jobTitle: 'Peter Bass',
            jobDesc: 'Massage Therapy',
            location: 'Ireland',
            submitedAt: '06-29-2020',
            budget: '$ 3500',
            actions: ''
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
                    <div className='action-group__content'><button type='button' >View Profile</button></div>
                    <div className='action-group__content'><button type='button' >View CV</button></div>
                </div>
            </div>
        );

    }

    function JobTitle(props) {
        const cellData = props.cell._cell.row.data;
        const { FlagComponent } = getCountryFlag(cellData.location)

        return (
            <div className="table__jobColumn_candidate">
                <div className="table__jobColumn_candidate-title"><div>{cellData.jobTitle}</div><div className='address-icon'><FlagComponent /></div></div>
                <div className="table__jobColumn_candidate-desc">{cellData.jobDesc.slice(0, 100)}{cellData.jobDesc.length > 99 && '...'}</div>
            </div>
        );

    }

    const columns = [
        {
            title: 'Job', field: 'jobTitle', headerSort: false,
            formatterParams: (cell) => ({ jobDesc: cell.getData()?.jobDesc, id: cell.getData()?.id, location: cell.getData()?.location }),
            formatter: reactFormatter(<JobTitle />),
            widthGrow: 3,
            vertAlign: 'middle',
            headerHozAlign: 'left'
        },
        {
            title: '', field: 'jobDesc',
            visible: false
        },
        { title: 'Budget', field: 'budget', headerSort: false, vertAlign: 'middle', hozAlign: 'center', headerHozAlign: 'center' },
        { title: 'Proposal Submited At', field: 'submitedAt', headerSort: false, vertAlign: 'middle', hozAlign: 'center', headerHozAlign: 'center', width: 200 },
        {
            title: '', field: 'actions', widthGrow: 3, headerSort: false,
            vertAlign: 'top', hozAlign: 'right',
            formatterParams: (cell) => ({ id: cell.getData().id }),
            formatter: reactFormatter(<ActionGroup />)
        }

    ]

    //waiting for data
    if (employersCandidate.length == 0) {
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
    else {
        return (
            <>
                <Header variant={LOGGEDIN_EMPLOYER} />
                <div className="page page-employer page-employer_jobs">
                    <div className="table-wrapper">
                        <TableWithPagination
                            initialRowData={employersCandidate}
                            columns={columns}
                            maxOnPage={5}
                            specialId={'tabulator-employer-candidate'}
                            filtredOptions={{
                                data: [
                                    { label: 'All', value: 'All' },
                                    { label: 'Looking for sport massanger', value: 'massage' },
                                ],
                                column: 'jobDesc'
                            }}

                        />
                    </div>
                </div>
            </>
        )
    }
}
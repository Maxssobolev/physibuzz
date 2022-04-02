import { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import { LOGGEDIN_EMPLOYER } from '../../components/Header/HeadersVariants'
import TableWithPagination from '../../components/TableWithPagination/TableWithPagination'
import { reactFormatter } from 'react-tabulator'
import MoreAction from '../../assets/img/icons/more-action.svg'
import { getCountryFlag } from '../../components/CommonUtils/getCountryFlag'
import { useWindowDimensions } from '../../components/Hooks/useWindowDimensions'
import useProfessions from '../../components/Hooks/useProfessions'
import api from '../../apiConfig'
import { useRouter } from 'next/router'

export default function EmployerCadidate() {
    const [employersCandidate, setEmployersCandidate] = useState([])
    const isMobile = useWindowDimensions().width <= 425

    const professions = useProfessions()
    const router = useRouter()

    useEffect(() => {

        api.get(`/api/v1/candidate/user`).then((r) => {
            const recievedData = r.data.data
            console.log(recievedData)
            setEmployersCandidate(recievedData)
        })

    }, [])

    function ActionGroup(props) {
        const [isActionMenuOpen, setIsActionMenuOpen] = useState(false)
        const cellData = props.cell._cell.row.data;
        const userID = cellData.user.id
        return (
            <div className="header-rightside__user user-dropdown action-group" tabIndex={0} onClick={() => setIsActionMenuOpen(!isActionMenuOpen)} onBlur={() => setTimeout(() => setIsActionMenuOpen(false), 100)} >
                <div className="user-dropbtn"><MoreAction width={5} /></div>
                <div className="user-dropdown-content" style={{
                    display: isActionMenuOpen ? 'block' : 'none',
                }} >
                    <div className='action-group__content'><button type='button' onClick={() => router.push(`/profile?id=${encodeURIComponent(userID)}`)}>View Profile</button></div>
                    <div className='action-group__content'><button type='button' onClick={() => router.push(`/profile/cv?id=${encodeURIComponent(userID)}`)}>View CV</button></div>
                </div>
            </div>
        );

    }

    function JobTitle(props) {
        const cellData = props.cell._cell.row.data;
        const { FlagComponent } = getCountryFlag(cellData.user.country)
        const { user } = cellData

        return (
            <div className="table__jobColumn_candidate">
                <div className="table__jobColumn_candidate-title"><div>{user.name} {user.last_name}</div><div className='address-icon'><FlagComponent /></div></div>
                <div className="table__jobColumn_candidate-desc">Sport massanger</div>
            </div>
        );

    }

    const columns = [
        {
            title: 'Job', field: 'title', headerSort: false,
            formatterParams: (cell) => ({ description: cell.getData()?.description, id: cell.getData()?.id, country: cell.getData()?.country }),
            formatter: reactFormatter(<JobTitle />),
            widthGrow: 3,
            vertAlign: 'middle',
            headerHozAlign: 'left'
        },
        {
            title: '', field: 'description',
            visible: false
        },
        { title: 'Budget', field: 'budget', headerSort: false, vertAlign: 'middle', hozAlign: 'center', headerHozAlign: 'center' },
        { title: 'Proposal Submited At', field: 'proposal', headerSort: false, vertAlign: 'middle', hozAlign: 'center', headerHozAlign: 'center', width: 200 },
        {
            title: '', field: 'actions', widthGrow: 3, headerSort: false,
            vertAlign: 'top', hozAlign: isMobile ? 'center' : 'right',
            formatterParams: (cell) => ({ id: cell.getData().id }),
            formatter: reactFormatter(<ActionGroup />)
        }

    ]

    //waiting for data
    if (employersCandidate.length == 0) {
        return (
            <>
                <Header />
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
                <Header />
                <div className="page page-employer page-employer_jobs">
                    <div className="table-wrapper">
                        <TableWithPagination
                            initialRowData={employersCandidate}
                            columns={columns}
                            maxOnPage={15}
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
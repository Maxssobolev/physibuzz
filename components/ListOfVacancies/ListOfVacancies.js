import { useState } from "react"
import VacancyCard from "../Cards/Vacancy/VacancyCard"
import api from '../../apiConfig'
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { cookies } from "../../pages/_app"
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from "../Loader/Loader"


function ListOfVacancies({ options }) {
    const user = useSelector(state => state.user)
    const {
        whatSelected,
        placeSelected,
        sortSelected,
        jobOrCourseSelected,
        distanceSelected
    } = options

    const [vacancyCards, setVacansyCards] = useState(null)
    const [page, setPage] = useState(1)

    const getVacancies = (pageNumber = 1) => {
        api.get(`/api/v1/vacancies?page=${pageNumber}`).then((r) => {
            const recievedData = r.data.data
            const total = recievedData.total
            const lastPage = recievedData.last_page

            if (pageNumber == 1) {
                setVacansyCards({
                    total,
                    lastPage,
                    rows: recievedData.data
                })
            }
            else {
                setVacansyCards(prev => {
                    return {
                        total,
                        lastPage,
                        rows: [...prev.rows, ...recievedData.data]
                    }
                })
            }

            setPage(pageNumber)
        })
    }

    //API CONNECTION
    useEffect(() => {
        //documentation of this api route https://physibuzz.rehabapps.net/docs/#vacancies
        getVacancies()
    }, [])


    if (!vacancyCards) {
        return <Loader />
    }
    return (
        <div className="listOfVacancies">
            <InfiniteScroll
                dataLength={vacancyCards.total}
                next={() => getVacancies(page + 1)}
                hasMore={page != vacancyCards.lastPage}
                loader={<Loader />}
                endMessage={
                    <p style={{ textAlign: 'center', color: 'var(--gray)' }}>
                        You have seen it all
                    </p>
                }
            >
                {vacancyCards.rows.map((itm) => <VacancyCard key={`vacancyCard__${itm.id}`} info={itm} />)}

            </InfiniteScroll>
        </div>
    )
}

export default ListOfVacancies
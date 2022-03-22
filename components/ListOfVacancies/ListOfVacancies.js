import { useState } from "react"
import VacancyCard from "../Cards/Vacancy/VacancyCard"

import InfiniteScroll from 'react-infinite-scroll-component';

function ListOfVacancies({ serverData }) {

    return (
        <div className="listOfVacancies">
            <InfiniteScroll
                dataLength={serverData?.total}
                next={() => {
                    jobOrCourseSelected == 'Job' ? getData('/api/v1/vacancies', page + 1) : getData('/api/v1/courses', page + 1)
                }}
                hasMore={page != serverData.lastPage}
                loader={<Loader />}
                endMessage={
                    <p style={{ textAlign: 'center', color: 'var(--gray)' }}>
                        You have seen it all
                    </p>
                }
            >
                {serverData.rows.map((itm) => <VacancyCard key={`vacancyCard__${itm.id}`} info={itm} />)}

            </InfiniteScroll>
        </div>
    )
}

export default ListOfVacancies

import Header from "../components/Header/Header"
import { LOGGEDIN_EMPLOYEE, LOGGEDIN_EMPLOYER } from "../components/Header/HeadersVariants" //deprecated. not used 

import Select from 'react-select'
import { customSelectStyles } from "../components/CommonUtils/CommonUtils"
import { DropdownIndicator } from "../components/CommonUtils/DropdownIndicator"

import LeftSidebar from "../components/Layout/LeftSidebar/LeftSidebar"
import MainContent from "../components/Layout/MainContent/MainContent"
import RightSidebar from "../components/Layout/RightSidebar/RightSidebar"
import Layout from "../components/Layout/Layout"

import { useState, useEffect } from "react"
import AdBanner from "../components/AdBanner/AdBanner"
import { useWindowDimensions } from "../components/Hooks/useWindowDimensions"
import HeaderPlaceholder from '../components/Header/HeaderPlaceholder'
import api from '../apiConfig'
import moment from "moment"
import VacancyCard from "../components/Cards/Vacancy/VacancyCard"
import Loader from "../components/Loader/Loader";
import InfiniteScroll from 'react-infinite-scroll-component';
import { AddressSuggestions } from 'react-dadata';
import { dadataToken } from '../apiConfig/dadata';
import 'react-dadata/dist/react-dadata.css';
import CrossIcon from '../assets/img/cross.svg'
import isEmpty from "lodash.isempty"
import useProfessions from "../components/Hooks/useProfessions"


export default function Home() {


  const setExistedFilters = (data) => {
    //profession filter
    let tmp1 = whatSelected ? data.filter(({ profession }) => whatSelected.id === profession.id) : data

    //sort filters
    let tmp2 = tmp1
    if (sortSelected) {
      if (sortSelected.label == 'Most Recent') {
        tmp2 = tmp1.sort((a, b) => {
          return new moment(b.updated_at).format('YYYYMMDD') - new moment(a.updated_at).format('YYYYMMDD')
        })
      }
      else if (sortSelected.label == 'Oldest') { //need to change 
        tmp2 = tmp1.sort((a, b) => {
          return new moment(a.updated_at).format('YYYYMMDD') - new moment(b.updated_at).format('YYYYMMDD')
        })
      }
    }

    return tmp2

  }

  //main part filters
  /*******************WHAT**********************/
  const whatOptions = useProfessions()
  const [whatSelected, setWhatSelected] = useState('')
  const handleChangeWhat = (selectedOpt) => {
    setWhatSelected(selectedOpt)
    setSortSelected(null)
    if (selectedOpt.label != 'All') {
      setDataToShow(prev => {
        return {
          total: prev.total,
          lastPage: prev.lastPage,
          rows: serverData['rows'].filter(({ profession }) => selectedOpt.id === profession.id)
        }
      })

    }
    else {
      setDataToShow(serverData)
    }
  }
  /*******************PLACE*********************/
  //пропсы для Dadata 
  const AddressSuggestionsOptions = {
    token: dadataToken,
    inputProps: {
      style: {
        height: '40px'
      },
      placeholder: 'Select...',
      className: 'field field_dadata',
      autoComplete: "new-password",
    },
    filterLanguage: 'en',
    filterLocations: [{
      "country": "*",
    }]
  }
  const [placeSelected, setPlaceSelected] = useState(null)
  const handleChangePlace = (val) => {

    if (!isEmpty(val)) {
      setPlaceSelected(val)
    }
    else {
      setPlaceSelected(null)
    }

    setSortSelected(null)

  }

  //side part filters
  /*******************SORT BY*********************/
  const sortOptions = [
    { value: 'Most Recent', label: 'Most Recent' },
    { value: 'Oldest', label: 'Oldest' },
  ]
  const [sortSelected, setSortSelected] = useState(sortOptions[0])
  const handleChangeSort = (selectedOpt) => {
    setSortSelected(selectedOpt)

    if (selectedOpt.label == 'Most Recent') {
      //it is default sort in server
      setDataToShow(prev => {
        return {
          ...prev,
          rows: prev.rows.sort((a, b) => {
            return new moment(b.updated_at).format('YYYYMMDD') - new moment(a.updated_at).format('YYYYMMDD')
          })

        }
      })
    }
    else if (selectedOpt.label == 'Oldest') { //need to change 
      //for example
      setDataToShow(prev => {
        return {
          ...prev,
          rows: prev.rows.sort((a, b) => {
            return new moment(a.updated_at).format('YYYYMMDD') - new moment(b.updated_at).format('YYYYMMDD')
          })
        }
      })
    }
  }


  /*******************Job / Course*********************/
  const jobOrCourseOptions = [
    { value: 'Job', label: 'Job' },
    { value: 'Course', label: 'Course' },
    //{ value: 'Both', label: 'Both' },
  ]
  const [jobOrCourseSelected, setJobOrCourseSelected] = useState(jobOrCourseOptions[0])
  const handleChangeJobOrCourse = (selectedOpt) => {
    setJobOrCourseSelected(selectedOpt)
  }

  /*******************Distance*********************/
  const distanceOptions = [
    { value: 'Within 25km', label: 'Within 25km' },
    { value: 'Other', label: 'Other' },
  ]
  const [distanceSelected, setDistanceSelected] = useState('')
  const handleChangeDistance = (selectedOpt) => {
    setDistanceSelected(selectedOpt)
  }


  //mobile definition
  const [isMobile, setIsMobile] = useState(undefined)
  const { width, height } = useWindowDimensions()
  useEffect(() => {
    setIsMobile(width <= 425)
  }, [width])


  //api connection

  const [serverData, setServerData] = useState(null)
  const [dataToShow, setDataToShow] = useState(serverData)
  const [page, setPage] = useState(1)

  const getData = (url, pageNumber = 1) => {
    api.get(`${url}?page=${pageNumber}`).then((r) => {
      const recievedData = url.includes('vacancies') ? r.data.data : r.data[0] //need to change
      const total = recievedData.total
      const lastPage = recievedData.last_page

      if (pageNumber == 1) {
        setServerData({
          total,
          lastPage,
          rows: recievedData.data
        })
        setDataToShow({
          total,
          lastPage,
          rows: recievedData.data
        })
      }
      else {
        setServerData(prev => {
          return {
            total,
            lastPage,
            rows: [...prev.rows, ...recievedData.data]
          }
        })
        setDataToShow(prev => {
          return {
            total,
            lastPage,
            rows: [...prev.rows, ...setExistedFilters(recievedData.data)] //фильтруем "на ходу"
          }
        })
      }

      setPage(pageNumber)
    })
  }

  //API CONNECTION
  useEffect(() => {
    //set sort filter to null before changing the data
    setSortSelected(null)

    //если у нам пофиг на метоположение
    if (!placeSelected) {
      if (jobOrCourseSelected.label == 'Job') {
        getData('/api/v1/vacancies')
      }
      else if (jobOrCourseSelected.label == 'Course') {
        getData('/api/v1/courses')
      }
    }
    //если метоположение выставлено
    else {
      const country = placeSelected.data.country
      const city = placeSelected.data.city
      console.log(country, city)

    }




  }, [jobOrCourseSelected, placeSelected])

  const [userId, setUserId] = useState(null)

  useEffect(() => {
    api.get('/api/v1/user/edit/current')
      .then(r => {
        setUserId(r.data.data.id)
      })

  }, [])


  if (isMobile === undefined) {
    return (

      <HeaderPlaceholder />

    )
  }
  //несколько измененная разметка для мобилок
  else if (isMobile) {
    return (
      <>
        <Header variant={LOGGEDIN_EMPLOYER} />
        <div className="page page-home ">
          <div className="main-params">
            <div className="field-wrapper">
              <Select styles={customSelectStyles} options={whatOptions} onChange={handleChangeWhat} components={{ DropdownIndicator }}
                responsive={{
                  xsmall: {
                    display: 'bottom',
                    touchUi: true
                  },
                  small: {
                    display: 'bottom',
                    touchUi: true
                  },

                }} />
              <span>What</span>
            </div>
            <div className="field-wrapper">
              {/* need to change  */}
              <AddressSuggestions
                onChange={handleChangePlace}
                {...AddressSuggestionsOptions}
                value={placeSelected}
              />
              {placeSelected && <button type="button" className="dadataReset" onClick={() => handleChangePlace(null)}><CrossIcon width={15} /></button>}
              <span>Where</span>
            </div>
          </div>
          <LeftSidebar>
            <div className="side-params">
              <div className="side-params__head">
                Filters
              </div>
              <div className="field-wrapper">
                <Select
                  responsive={{
                    xsmall: {
                      display: 'bottom',
                      touchUi: true
                    },
                    small: {
                      display: 'bottom',
                      touchUi: true
                    },

                  }}
                  key={`sortBy_selector`}
                  defaultValue={sortOptions[0]}
                  value={sortSelected || null}
                  styles={customSelectStyles} options={sortOptions} onChange={handleChangeSort} components={{ DropdownIndicator }} />
                <span>Sort by</span>
              </div>
              <div className="field-wrapper">

                <Select
                  responsive={{
                    xsmall: {
                      display: 'bottom',
                      touchUi: true
                    },
                    small: {
                      display: 'bottom',
                      touchUi: true
                    },

                  }}
                  defaultValue={jobOrCourseOptions[0]}
                  value={jobOrCourseSelected || null}

                  styles={customSelectStyles} options={jobOrCourseOptions} onChange={handleChangeJobOrCourse} components={{ DropdownIndicator }} />
                <span>Job / Course</span>
              </div>
              <div className="field-wrapper">

                <Select
                  responsive={{
                    xsmall: {
                      display: 'bottom',
                      touchUi: true
                    },
                    small: {
                      display: 'bottom',
                      touchUi: true
                    },

                  }}
                  styles={customSelectStyles} options={distanceOptions} onChange={handleChangeDistance} components={{ DropdownIndicator }} />

                <span>Distance</span>
              </div>
            </div>
          </LeftSidebar>
          <MainContent>
            {dataToShow?.rows.length > 0 ?
              <div className="listOfVacancies">
                <InfiniteScroll
                  dataLength={dataToShow.total}
                  next={() => {
                    jobOrCourseSelected.label == 'Job' ? getData('/api/v1/vacancies', page + 1) : getData('/api/v1/courses', page + 1)
                  }}
                  hasMore={page != dataToShow.lastPage}
                  loader={<Loader />}
                  endMessage={
                    <p style={{ textAlign: 'center', color: 'var(--gray)' }}>
                      You have seen it all
                    </p>
                  }
                >
                  {dataToShow.rows.map((itm) => <VacancyCard key={`vacancyCard__${itm.id}`} userId={userId} info={itm} type={jobOrCourseSelected.label == 'Job' ? 'vacancy' : 'course'} />)}

                </InfiniteScroll>
              </div>
              :
              <p style={{ textAlign: 'center', color: 'var(--gray)' }}>
                Nothing to show
              </p>
            }
          </MainContent>
          <RightSidebar>
            <AdBanner />
          </RightSidebar>
        </div>
      </>
    )
  }
  else {
    return (
      <>
        <Header variant={LOGGEDIN_EMPLOYER} />
        <div className="page page-home">

          <div className="main-params">
            <div className="field-wrapper">
              <Select styles={customSelectStyles} options={whatOptions} onChange={handleChangeWhat} components={{ DropdownIndicator }} />
              <span>What</span>
            </div>
            <div className="field-wrapper">

              <AddressSuggestions
                onChange={handleChangePlace}
                {...AddressSuggestionsOptions}
                value={placeSelected}
              />
              {placeSelected && <button type="button" className="dadataReset" onClick={() => handleChangePlace(null)}><CrossIcon width={15} /></button>}
              <span>Where</span>
            </div>
          </div>

          <Layout>
            <LeftSidebar>
              <div className="side-params">
                <div className="side-params__head">
                  Filters
                </div>
                <div className="field-wrapper">
                  <Select
                    key={`sortBy_selector`}
                    defaultValue={sortOptions[0]}
                    value={sortSelected || null}
                    styles={customSelectStyles} options={sortOptions} onChange={handleChangeSort} components={{ DropdownIndicator }} />
                  <span>Sort by</span>
                </div>
                <div className="field-wrapper">

                  <Select
                    key={`jobOrCourse_selector`}

                    defaultValue={jobOrCourseOptions[0]}
                    value={jobOrCourseSelected || null}
                    styles={customSelectStyles} options={jobOrCourseOptions} onChange={handleChangeJobOrCourse} components={{ DropdownIndicator }} />
                  <span>Job / Course</span>
                </div>
                <div className="field-wrapper">

                  <Select styles={customSelectStyles} options={distanceOptions} onChange={handleChangeDistance} components={{ DropdownIndicator }} />

                  <span>Distance</span>
                </div>
              </div>
            </LeftSidebar>
            <MainContent>

              {dataToShow?.rows.length > 0 ?
                <div className="listOfVacancies">
                  <InfiniteScroll
                    dataLength={dataToShow.total}
                    next={() => {
                      jobOrCourseSelected.label == 'Job' ? getData('/api/v1/vacancies', page + 1) : getData('/api/v1/courses', page + 1)
                    }}
                    hasMore={page != dataToShow.lastPage}
                    loader={<Loader />}
                    endMessage={
                      <p style={{ textAlign: 'center', color: 'var(--gray)' }}>
                        You have seen it all
                      </p>
                    }
                  >
                    {dataToShow.rows.map((itm) => <VacancyCard key={`vacancyCard__${itm.id}`} userId={userId} info={itm} type={jobOrCourseSelected.label == 'Job' ? 'vacancy' : 'course'} />)}

                  </InfiniteScroll>
                </div>
                :
                <p style={{ textAlign: 'center', color: 'var(--gray)' }}>
                  Nothing to show
                </p>
              }


            </MainContent>
            <RightSidebar>
              <AdBanner />
            </RightSidebar>
          </Layout>
        </div>
      </>
    )
  }
}

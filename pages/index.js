
import Header from "../components/Header/Header"
import Select from 'react-select'
import { LOGGEDIN_EMPLOYEE, LOGGEDIN_EMPLOYER } from "../components/Header/HeadersVariants"

import LeftSidebar from "../components/Layout/LeftSidebar/LeftSidebar"
import MainContent from "../components/Layout/MainContent/MainContent"
import RightSidebar from "../components/Layout/RightSidebar/RightSidebar"
import Layout from "../components/Layout/Layout"
import { useState, useEffect } from "react"
import { customSelectStyles } from "../components/CommonUtils/CommonUtils"
import ListOfVacancies from "../components/ListOfVacancies/ListOfVacancies"
import AdBanner from "../components/AdBanner/AdBanner"
import { DropdownIndicator } from "../components/CommonUtils/DropdownIndicator"
import { useWindowDimensions } from "../components/CommonUtils/useWindowDimensions"
import HeaderPlaceholder from '../components/Header/HeaderPlaceholder'

//home page ONLY FOR LOGGED USERS

export default function Home() {
  //main part filters
  /*******************WHAT**********************/
  const [whatOptions, setWhatOptions] = useState([
    { value: 'Sport Manager', label: 'Sport Manager' },
    { value: 'Other', label: 'Other' },
  ])
  const [whatSelected, setWhatSelected] = useState('')
  const handleChangeWhat = (selectedOpt) => {
    setWhatSelected(selectedOpt.value)
  }
  /*******************PLACE*********************/
  const [placeOptions, setPlaceOptions] = useState([
    { value: 'London, England, United Kingdom', label: 'London, England, United Kingdom' },
    { value: 'Other', label: 'Other' },
  ])
  const [placeSelected, setPlaceSelected] = useState('')
  const handleChangePlace = (selectedOpt) => {
    setPlaceSelected(selectedOpt.value)
  }

  //side part filters
  /*******************SORT BY*********************/
  const [sortOptions, setSortOptions] = useState([
    { value: 'Most Recent', label: 'Most Recent' },
    { value: 'Other', label: 'Other' },
  ])
  const [sortSelected, setSortSelected] = useState('')
  const handleChangeSort = (selectedOpt) => {
    setSortSelected(selectedOpt.value)
  }

  /*******************Job / Course*********************/
  const [jobOrCourseOptions, setJobOrCourseOptions] = useState([
    { value: 'Job', label: 'Job' },
    { value: 'Course', label: 'Course' },
    { value: 'Both', label: 'Both' },
  ])
  const [jobOrCourseSelected, setJobOrCourseSelected] = useState('')
  const handleChangeJobOrCourse = (selectedOpt) => {
    setJobOrCourseSelected(selectedOpt.value)
  }

  /*******************Distance*********************/
  const [distanceOptions, setDistanceOptions] = useState([
    { value: 'Within 25km', label: 'Within 25km' },
    { value: 'Other', label: 'Other' },
  ])
  const [distanceSelected, setDistanceSelected] = useState('')
  const handleChangeDistance = (selectedOpt) => {
    setDistanceSelected(selectedOpt.value)
  }




  //mobile definition
  const [isMobile, setIsMobile] = useState(undefined)
  const { width, height } = useWindowDimensions()
  useEffect(() => {
    setIsMobile(width <= 425)
  }, [width])

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
              <Select styles={customSelectStyles}
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
                options={placeOptions} onChange={handleChangePlace} components={{ DropdownIndicator }} />
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
            <ListOfVacancies options={{
              whatSelected,
              placeSelected,
              sortSelected,
              jobOrCourseSelected,
              distanceSelected
            }} />
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
              {/* need to change  */}
              <Select styles={customSelectStyles} options={placeOptions} onChange={handleChangePlace} components={{ DropdownIndicator }} />
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
                  <Select styles={customSelectStyles} options={sortOptions} onChange={handleChangeSort} components={{ DropdownIndicator }} />
                  <span>Sort by</span>
                </div>
                <div className="field-wrapper">

                  <Select styles={customSelectStyles} options={jobOrCourseOptions} onChange={handleChangeJobOrCourse} components={{ DropdownIndicator }} />
                  <span>Job / Course</span>
                </div>
                <div className="field-wrapper">

                  <Select styles={customSelectStyles} options={distanceOptions} onChange={handleChangeDistance} components={{ DropdownIndicator }} />

                  <span>Distance</span>
                </div>
              </div>
            </LeftSidebar>
            <MainContent>

              <ListOfVacancies options={{
                whatSelected,
                placeSelected,
                sortSelected,
                jobOrCourseSelected,
                distanceSelected
              }} />


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

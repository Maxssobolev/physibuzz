import Header from "../components/Header/Header"
import Select from 'react-select'
import { LOGGEDIN_HEADER } from "../components/Header/HeadersVariants"

import LeftSidebar from "../components/Layout/LeftSidebar/LeftSidebar"
import MainContent from "../components/Layout/MainContent/MainContent"
import RightSidebar from "../components/Layout/RightSidebar/RightSidebar"
import Layout from "../components/Layout/Layout"
import { useState } from "react"
import { customSelectStyles } from "../components/CommonUtils/CommonUtils"
import ListOfVacancies from "../components/ListOfVacancies/ListOfVacancies"
import { Range } from 'react-range';


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

  return (
    <>
      <Header variant={LOGGEDIN_HEADER} />
      <div className="page page-home">

        <div className="main-params">
          <div className="field-wrapper">
            <Select styles={customSelectStyles} options={whatOptions} onChange={handleChangeWhat} />
            <span>What</span>
          </div>
          <div className="field-wrapper">
            {/* need to change  */}
            <Select styles={customSelectStyles} options={placeOptions} onChange={handleChangePlace} />
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
                <Select styles={customSelectStyles} options={sortOptions} onChange={handleChangeSort} />
                <span>Sort by</span>
              </div>
              <div className="field-wrapper">

                <Select styles={customSelectStyles} options={jobOrCourseOptions} onChange={handleChangeJobOrCourse} />
                <span>Job / Course</span>
              </div>
              <div className="field-wrapper">

                <Select styles={customSelectStyles} options={distanceOptions} onChange={handleChangeDistance} />

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
          </RightSidebar>
        </Layout>
      </div>
    </>
  )
}

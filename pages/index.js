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
          </LeftSidebar>
          <MainContent>

            <ListOfVacancies />


          </MainContent>
          <RightSidebar>
          </RightSidebar>
        </Layout>
      </div>
    </>
  )
}

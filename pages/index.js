import Header from "../components/Header/Header"
import Select from 'react-select'
import { LOGGEDIN_HEADER } from "../components/Header/HeadersVariants"

import LeftSidebar from "../components/Layout/LeftSidebar/LeftSidebar"
import MainContent from "../components/Layout/MainContent/MainContent"
import RightSidebar from "../components/Layout/RightSidebar/RightSidebar"
import Layout from "../components/Layout/Layout"
import { useState } from "react"

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

  console.log(whatSelected)

  return (
    <>
      <Header variant={LOGGEDIN_HEADER} />
      <div className="page page-home">
        <Layout>
          <LeftSidebar>
          </LeftSidebar>
          <MainContent>
            <div className="main-params">
              <div className="field-wrapper">
                <Select options={whatOptions} onChange={handleChangeWhat} className='field_imp field_select_imp' />
                <span>What</span>
              </div>
              <div className="field-wrapper">
                <Select options={placeOptions} onChange={handleChangePlace} />
                <span>Where</span>
              </div>
            </div>
          </MainContent>
          <RightSidebar>
          </RightSidebar>
        </Layout>
      </div>
    </>
  )
}

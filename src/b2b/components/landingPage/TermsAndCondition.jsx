import React, { useEffect, useState } from 'react'
import LandingPageHeader from './LandingPageHeader'
import LandingPageFooter from './LandingPageFooter'
import axios from '../../../axios'
import { useSelector } from 'react-redux'
import Header from '../Header/Header'

function TermsAndCondition() {
    const [termsAndConditions, setTermsAndConditions] = useState('');
    const { isLoggedIn, token } = useSelector((state)=> state.agents)
    const getTermsAndConditionDatas = async () => {
        try {
            const res = await axios.get(`/b2b/settings/terms-and-conditions`)
            setTermsAndConditions(res?.data?.termsAndConditions);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=> {
        getTermsAndConditionDatas()
    }, [])

  return (
    <div>
        {
            isLoggedIn === true && token ? (
              <div>
                <Header />
              </div>
            ) : (
    <div>
        <LandingPageHeader/>
    </div>
            )
        }
    <div className='py-10 px-2  max-w-screen-xl mx-auto'>
        <div>
            <h1 className='text-2xl font-bold '>Terms And Conditions</h1>
        </div>
        <div className='pt-4'>
          <div dangerouslySetInnerHTML={{ __html: termsAndConditions }} />
        </div>
    </div>
    <div className='pt-10'>
        <LandingPageFooter />
    </div>
  </div>
  )
}

export default TermsAndCondition

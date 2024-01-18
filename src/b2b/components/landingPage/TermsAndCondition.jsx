import React, { useEffect, useState } from 'react'
import LandingPageHeader from './LandingPageHeader'
import LandingPageFooter from './LandingPageFooter'
import axios from '../../../axios'

function TermsAndCondition() {
    const [termsAndConditions, setTermsAndConditions] = useState('');
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
    <div>
        <LandingPageHeader/>
    </div>
    <div className='py-10 px-2  max-w-screen-xl mx-auto'>
        <div>
            <h1 className='text-xl font-semibold'>Terms And Conditions</h1>
        </div>
        <div className='pt-4'>
          <div dangerouslySetInnerHTML={{ __html: termsAndConditions }} />
        </div>
    </div>
    <div>
        <LandingPageFooter />
    </div>
  </div>
  )
}

export default TermsAndCondition

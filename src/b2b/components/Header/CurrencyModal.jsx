import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeCurrency } from '../../../redux/slices/homeSlice' 

function CurrencyModal({ setCurrency, currency }) {
    const dispatch = useDispatch()
    const { currencies } = useSelector(state => state.home)


    return (
        <div className="absolute z-20 top-7 md:top-14 -left-8 bg-light rounded-md w-[250px] border"  >
            <div className=" ">
                {currencies?.map((item,index) => (
                <div className="flex space-x-2 py-2 items-center hover:bg-gray-100 px-4 " 
                key={index} 
                onClick={() => {
                    dispatch(changeCurrency({
                        isocode: item?.isocode,
                        conversionRate: item?.conversionRate,
                        flag: item?.country?.flag,
                    }))
                    setCurrency(!currency)
                }}
                >
                    <img src={item?.country?.flag} alt={item?.country?.countryName} className='w-[30px]' />
                    <p className='text-[14px] text-start whitespace-nowrap capitalize'>{item?.country?.countryName}</p>
                </div>
                ))}
            </div>
        </div>
    )
}

export default CurrencyModal
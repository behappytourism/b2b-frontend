import React, { useRef, useState } from 'react'
import { MdClose } from 'react-icons/md'
import useHandleClickOutside from '../../../hooks/useHandleClickOutside';
import WalletPaypalComponent from '../../../components/Payment/WalletPaypalComponent'

function WalletDepositModal({ setWalletDropdown }) {
  const [paymentType, setPaymentType] = useState({
    paypal: true,
    razorpay: false
  })

  const wrapperRef = useRef();
  useHandleClickOutside(wrapperRef, () =>
    setWalletDropdown(false)
  );
  return (
    <div className="fixed inset-0 w-full h-full lightglass flex items-center justify-center z-20 " >
      <div
        ref={wrapperRef}
        className="bg-[#fff] w-full max-h-[90vh] max-w-[500px]  shadow-[0_1rem_3rem_rgb(0_0_0_/_18%)] overflow-y-auto"
      >
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="font-medium mb-2">
            Deposit
          </h2>
          <button
            className="h-auto bg-transparent text-textColor text-xl"
            onClick={() => setWalletDropdown(false)}
          >
            <MdClose />
          </button>
        </div>
        <div className="p-4">
          <div className='w-full grid grid-cols-2 mb-2'>
            <p className={`py-2 ${paymentType.paypal ? "bg-[#e1e5ee]" : ""} w-full rounded  text-center cursor-pointer`}
            onClick={() => setPaymentType({paypal: true, razorpay: false})}>Paypal</p>
            <p className={`py-2 ${paymentType.razorpay ? "bg-[#e1e5ee]" : ""} w-full rounded  text-center cursor-pointer`}
            onClick={() => setPaymentType({paypal: false, razorpay: true})}>RazorPay</p>
          </div>
          {paymentType.paypal && (
            <WalletPaypalComponent />
          )}
          {paymentType.razorpay && (
            <div className='h-20'>
              </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WalletDepositModal
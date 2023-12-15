import React, { useRef, useState } from 'react'
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../axios';
import { useHandleClickOutside } from '../../../hooks';
import { removeSubagentVisaMarkup } from '../../../redux/slices/markupSlice';
import { BtnLoader } from '../../components'

function AgentVisaMarkupModal({ setMarkup, setMarkupData }) {
  const dispatch = useDispatch()

  const wrapperRef = useRef();
  useHandleClickOutside(wrapperRef, () =>
    setMarkup({ client: false, agent: false })
  );

  const { token } = useSelector(state => state.agents)
  const { visaAgentMarkup } = useSelector(state => state.markups)

  const [markupType, setMarkupType] = useState(visaAgentMarkup?.agentMarkup?.markupType || '')
  const [markupAmount, setMarkupAmount] = useState(visaAgentMarkup?.agentMarkup?.markup || 0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')


  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setError('')
      setIsLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      const response = await axios.patch("/b2b/subagent/visa/markup/upsert", {
        markup: markupAmount,
        markupType: markupType,
        visaType: visaAgentMarkup?._id
      }, config);

      setIsLoading(false);
      setMarkup({ client: false, agent: false })
      setMarkupData((prev) => {
        return {...prev, agent: response.data }
      })
      return response.data;
    } catch (err) {
      setError(
        err?.response?.data?.error || "Something went wrong, Try again"
      );
      setIsLoading(false);
    }
  }


  return (
    <div>

      <div className="fixed inset-0 w-full h-full lightglass flex items-center justify-center z-20 ">
        <div
          ref={wrapperRef}
          className="bg-[#fff] w-full max-h-[90vh] max-w-[500px] rounded shadow-[0_1rem_3rem_rgb(0_0_0_/_18%)] overflow-y-auto"
        >
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="font-medium mb-2">
             Visa Agent Markup
            </h2>
            <button
              className="h-auto bg-transparent text-textColor text-xl"
              onClick={() => setMarkup({ client: false, agent: false })}
            >
              <MdClose />
            </button>
          </div>
          <div className="p-6">
            <form onSubmit={submitHandler} className='space-y-3'>
              <h2 className='font-medium'>{visaAgentMarkup?.name}</h2>
              <div>
                <label htmlFor="" className='label'>Markup Type*</label>
                <select
                  className='select'
                  type="text"
                  placeholder="Enter Flat Amount"
                  value={markupType}
                  onChange={(e) => setMarkupType(e.target.value)}
                >
                  <option className='text-text' hidden>Choose Markup Type</option>
                  <option value={'flat'}>Flat</option>
                  <option value={'percentage'}>Percentage</option>
                </select>
              </div>
              <div>
                <label htmlFor="" className='label'>Mark up*</label>
                <input
                  className='input'
                  type="number"
                  placeholder="Enter Percentage"
                  value={markupAmount}
                  onChange={(e) => setMarkupAmount(e.target.value)}
                />
              </div>
              <div className="mt-4 flex items-center justify-end gap-[12px]">
                {error && (
                  <p className='text-main text-xs'> {error}</p>
                )}
                <span className="w-[100px] h-[40px] text-[14px] bg-orange-600 text-white rounded-[0.25rem] flex justify-center items-center font-[600] cursor-pointer" 
                onClick={() => {
                  dispatch(removeSubagentVisaMarkup({
                    _id: visaAgentMarkup?._id,
                    name: visaAgentMarkup?.name,
                    id: visaAgentMarkup?.agentMarkup?._id
                  }))
                  setMarkupData((prev) => {
                    return {...prev, agent: '' }
                  })
                  setMarkup({ client: false, agent: false })
                }}
                >
                  Remove
                </span>
                <button className="w-[100px] button" type='submit'>
                {isLoading ? <BtnLoader /> : 'Mark'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AgentVisaMarkupModal
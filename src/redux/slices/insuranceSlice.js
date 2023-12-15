import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    genaralData: {
        plan: "",
        residence: "UAE",
        destination: "",
        travelFrom: "",
        travelTo: "",
        travelType: "SG",
        // email:"",
        // phoneNumber:"",
        // address:"",
        // note: ""
    },
    beneficiaryData:[],
}

export const insuranceSlice = createSlice({
    name: "insurance",
    initialState,
    reducers: {

        setGenaralDataInsurance: (state, {payload}) => {
            const {name, value} = payload
            state.genaralData[name] = value
        },

        setBeneficiaryDataInsuracne: (state, {payload}) => {
            state.beneficiaryData.push(payload)
        },

        handleDeleteBeneficiaryData: (state, { payload }) => {
            let index = payload
            state.beneficiaryData.splice(index, 1)
        },

        handleEditBeneficiaryData: (state, {payload}) => {
            const {index, data} = payload
           state.beneficiaryData[index].firstName = data.firstName
           state.beneficiaryData[index].lastName = data.lastName
           state.beneficiaryData[index].gender = data.gender
           state.beneficiaryData[index].dateOfBirth = data.dateOfBirth
           state.beneficiaryData[index].passportNumber = data.passportNumber
        },

        handleSingleBenificiaryData:(state, {payload})=>{
            if(state.beneficiaryData.length > 0){
                state.beneficiaryData[0].firstName = payload.firstName
                state.beneficiaryData[0].lastName = payload.lastName
                state.beneficiaryData[0].gender = payload.gender
                state.beneficiaryData[0].dateOfBirth = payload.dateOfBirth
                state.beneficiaryData[0].passportNumber = payload.passportNumber
            } else {
                state.beneficiaryData.push(payload)
            }
        },

        setClearAllDatas: (state, {payload}) =>{
            let data = {
                plan: "",
                residence: "UAE",
                destination: "",
                travelFrom: "",
                travelTo: "", 
                travelType: ""

            }
            state.genaralData = data
            state.beneficiaryData = []
        },

     
    }
})

export const {

    setGenaralDataInsurance,
    setBeneficiaryDataInsuracne,
    handleDeleteBeneficiaryData,
    handleEditBeneficiaryData,
    setClearAllDatas,
    handleSingleBenificiaryData,

} = insuranceSlice.actions;
export default insuranceSlice.reducer
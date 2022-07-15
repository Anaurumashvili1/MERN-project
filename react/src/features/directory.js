import {createSlice} from "@reduxjs/toolkit"

export const directory = createSlice({
    name: "directory",
    initialState: {
        value: [{name: "Nymphadora", phone: "111111",id:0}, {name: "Sirius", phone: "222222", id:1}, {
            name: "Luna",
            phone: "888888",
            id:3
        }]
    },
    reducers: {
        addPerson: (state, action) => {
            state.value= [...state.value, action.payload]
        },
        editPerson: (state, action)=>{
            state.value=state.value.map(person=>person.id!==action.payload.id ? person : action.payload)
        },
        removePerson: (state, action) =>{
            state.value=state.value.filter(person=>person.id!==action.payload)
        }
    }

})
export const {addPerson,editPerson,removePerson} = directory.actions
export default directory.reducer
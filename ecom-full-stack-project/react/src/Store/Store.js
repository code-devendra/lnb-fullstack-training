import {createStore , applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import RootReducer from '../Reducers/CombineReducers'



const persistedState  = localStorage.getItem('reduxStore') ? JSON.parse(localStorage.getItem('reduxStore')) : {}




const store  = createStore(
    RootReducer ,  
    persistedState , 
    
    applyMiddleware(thunk)
)


export default store;








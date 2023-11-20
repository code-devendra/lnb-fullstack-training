import {combineReducers} from 'redux'
import CountReducer from './CountReducer'
import LoginReducer from './LoginReducer'
import CartCount from './CartCount'



export default combineReducers({

    CountReducer,
    LoginReducer,
    CartCount

})
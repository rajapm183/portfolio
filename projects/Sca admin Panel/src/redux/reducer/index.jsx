import {combineReducers} from 'redux'
import { Category, Product } from './reducers'
export const combine = combineReducers({cate:Category, prod:Product})
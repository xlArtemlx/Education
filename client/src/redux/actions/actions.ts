import {AppActions} from '../types/actions'
import { Dispatch } from "redux";
import {ListType} from '../../interfaces/ListType'

export const SET_LIST = 'SET_LIST'

export const setList = (list:ListType[]):AppActions =>({type: SET_LIST,list})

export const setListTC = (list:ListType[]) => async (dispatch: Dispatch<AppActions>) => {
    dispatch(setList(list))
}


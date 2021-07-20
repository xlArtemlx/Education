import {AppActions} from '../types/actions'
import { Dispatch } from "redux";
import {ListType} from '../../interfaces/ListType'
import {BoardType} from '../../interfaces/BoardType'

export const SET_LIST = 'SET_LIST'
export const SET_BOARD = 'SET_BOARD'

export const setList = (list:ListType[]):AppActions =>({type: SET_LIST,list})
export const setBoard = (board:BoardType[]):AppActions =>({type: SET_BOARD,board})

export const setListTC = (list:ListType[]) => async (dispatch: Dispatch<AppActions>) => {
    dispatch(setList(list))
}

export const setBoardTC = (board:BoardType[]) => async (dispatch: Dispatch<AppActions>) => {
    dispatch(setBoard(board))
}


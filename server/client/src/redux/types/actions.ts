import {
    SET_LIST,
    SET_BOARD,
} from '../actions/actions'
import {ListType} from '../../interfaces/ListType'
import {BoardType} from '../../interfaces/BoardType'


export interface SetListAction {
  type: typeof SET_LIST;
  list: ListType[];
}
export interface SetBoardAction {
  type: typeof SET_BOARD;
  board: BoardType[];
}

  export type MainActionTypes = 
  |SetListAction
  |SetBoardAction

  
  export type AppActions = MainActionTypes;

import {
    SET_LIST,
} from '../actions/actions'
import {ListType} from '../../interfaces/ListType'


export interface SetListAction {
  type: typeof SET_LIST;
  list: ListType[];
}

  export type MainActionTypes = SetListAction

  
  export type AppActions = MainActionTypes;

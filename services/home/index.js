import {callFunction} from '../../utils/request.js'

export function getLabel() {
  return callFunction('getTab')
}
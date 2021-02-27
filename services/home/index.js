import {callFunction} from '../../utils/request.js'

export function getLabel() {
  return callFunction('getTab')
}

export function getArticleList(data) {
  return callFunction('getArticleList', data)
}
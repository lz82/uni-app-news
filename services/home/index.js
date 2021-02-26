import {callFunction} from '../../utils/request.js'

export function getLabel() {
  return callFunction('getTab')
}

export function getArticleList(classify) {
  return callFunction('getArticleList', {classify})
}
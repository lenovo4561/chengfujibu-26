import $ajax from '../ajax'

/**
 * @desc 用户相关接口
 */
const baseUrl = 'https://quick.shijinzhuang.com/'

export default {
  init(data) {
    return $ajax.get(`${baseUrl}user/init.do`, data)
  }
}

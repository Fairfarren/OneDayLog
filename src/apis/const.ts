export enum RES_CODE {
    /** 成功 */
    SUCCESS = 200,
    /** 到期 */
    EXPIRE = 403,
}

export enum STORAGE_KEY {
    TOKEN = 'token',
}

const API_URL = {
    /** 获取用户信息 */
    USER_INFO: '/wechat/getUserInfo',
    /** 获取事件列表 */
    EVENT_LIST: '/wechat/event/list',
    /** 添加事件 */
    EVENT_ADD: '/wechat/event/add',
}

export default API_URL

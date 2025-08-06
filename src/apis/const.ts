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
}

export default API_URL

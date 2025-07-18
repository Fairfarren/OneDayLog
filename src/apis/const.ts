export enum RES_CODE {
    /** 成功 */
    SUCCESS = 200,
    /** 到期 */
    EXPIRE = 403,
}

export enum STORAGE_KEY {
    TOKEN = 'token',
}

const VERSION = 'v1'

const API_URL = {
    /** 上传图片时获取 */
    GET_TOKEN: `/api/${VERSION}/common/file/getToken`,
}

export default API_URL

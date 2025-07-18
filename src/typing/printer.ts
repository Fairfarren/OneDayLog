import type { Dictionary, PrintInfo } from '@/typing/dictionary'

export type PrintList = PrintInfo &
    Pick<Dictionary, 'updateTime' | 'insertTime'> & {
        userId: string
    }

export interface PrintLog {
    boxDeviceId: null
    boxDeviceKey: null
    boxDrive: null
    content: string
    deleted: number
    deviceId: string
    id: string
    insertTime: string
    jbDeviceId: null
    reason: string
    resultCode: number
    resultUrl: string
    robotNum: string
    updateTime: string
    userId: string
}

export class PrintRecordList {
    time = ''
    robot = {
        label: '全部小熊',
        value: '',
    }
}

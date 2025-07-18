export class Dictionary {
    size: number = 0
    current: number = 0
    debtTime: string = ''
    updateTime: string = ''
    insertTime: string = ''
}

export class PageSize {
    pageNum = 1
    pageSize = 20
}

export enum PRINT_TYPE {
    盒子,
    佳博,
}

export class PrintInfo {
    id: string = ''
    robotNum: string = ''
    deviceId: string = ''
    deleted: number = 0
    print_id: string = ''
    print_Key: string = ''
    print_drive: string = ''
    print_type: PRINT_TYPE = PRINT_TYPE['盒子']
}

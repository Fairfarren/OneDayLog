import { canvasToTempFilePath, getStorage } from '@tarojs/taro'
import dayjs from 'dayjs'
import shareBillRtBf from '@/assets/share/bill-rt-bf.png'
import type { shareOption } from '@/components/share'
import { BOOK_INFO } from '@/const'
import PATH_URL from '@/const/path'
import {
    createCanvas,
    drawImg,
    formatText,
    getTextWidth,
    writeText,
} from '@/utils'

function formatNickName(text: string) {
    return text.length > 6 ? `${text.slice(0, 5)}...` : text
}

/**
 * 车次详情分享
 * @param props
 * @param props.price 金额
 * @param props.userName 用户昵称
 * @param props.corporation 企业
 * @param props.id id
 * @param props.isOver 是否结束
 * @param props.isDetail 分享明细账单
 */
export function trainShare(props) {
    const {
        price,
        corporation,
        bookName,
        isOver,
        showPurchase,
        showSalesDetail,
    } = props
    return new Promise<typeof shareOption>((resolve) => {
        const scale = 2
        ;(async () => {
            try {
                const w = 420 * scale
                const h = 336 * scale
                let top = 0
                const { canvas, ctx } = await createCanvas('#myCanvas', {
                    w,
                    h,
                })
                await drawImg(
                    canvas,
                    ctx,
                    isOver
                        ? 'https://remember-quick.oss-cn-chengdu.aliyuncs.com/app/ac485a9ffb2fb192ef4c496acb6a9902.png'
                        : 'https://remember-quick.oss-cn-chengdu.aliyuncs.com/app/a4f627a782f2173f38e008370bb0ebf7.png',
                    {
                        w,
                        h,
                        x: 0,
                        y: 0,
                    },
                )
                top += 52 + 28
                ctx.font = `600 ${28 * scale}px -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif`
                ctx.fillStyle = '#262626'
                await writeText(ctx, {
                    text: bookName,
                    x: 46 * 2,
                    y: top * scale,
                })

                top += 8 + 64
                ctx.font = `400 ${64 * scale}px JDZhengHT-Bold`
                ctx.fillStyle = '#01B889'
                const left = await getTextWidth(ctx, price)
                await writeText(ctx, {
                    text: price,
                    x: 42 * scale,
                    y: top * scale,
                })
                ctx.font = `400 ${24 * scale}px -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif`
                await writeText(ctx, {
                    text: '元',
                    x: left + 42 * scale,
                    y: top * scale,
                })

                top += 6 + 40
                ctx.fillStyle = '#AAAAAA'
                ctx.font = `500 ${22 * scale}px -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif`
                await writeText(ctx, {
                    text: corporation,
                    x: 42 * scale,
                    y: top * scale,
                })

                canvasToTempFilePath({
                    width: w,
                    height: h,
                    destWidth: w,
                    destHeight: h,
                    canvas,
                    fileType: 'jpg',
                })
                    .then((res) => {
                        resolve({
                            title: '点击【销售明细】,可查看本车销售详情',
                            path: `${PATH_URL.TRAIN_DETAIL}?isShare=true&pageId=${props.id}&showAdditional=${props.showAdditional}&isDetail=${props.isDetail ? 'true' : ''}&showPurchase=${showPurchase}&showSalesDetail=${showSalesDetail}`,
                            imageUrl: res.tempFilePath,
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } catch (err) {
                console.log(err)
            }
        })()
    })
}

// 账单分享
export function billShare({
    debtorMoney,
    choiceMoney,
    nickName,
    time,
    num,
    id,
    shareUser,
    debtorId,
    bookKeepingId,
    shareUserId,
    inviteId = '',
    isAll = false,
    sharePrice = 0,
    showTotalPrice = false,
    showQuotaJin = false,
    showPurchase = false,
}) {
    return new Promise<typeof shareOption>((resolve) => {
        const scale = 2
        ;(async () => {
            try {
                const w = 420 * scale
                const h = 336 * scale
                let top = 0
                const { canvas, ctx } = await createCanvas('#myCanvas', {
                    w,
                    h,
                })
                await drawImg(
                    canvas,
                    ctx,
                    isAll
                        ? 'https://remember-quick.oss-cn-chengdu.aliyuncs.com/weixin/bill-all.png'
                        : 'https://remember-quick.oss-cn-chengdu.aliyuncs.com/app/cb7ba9ed58f1b8e078ca2c87f47f41ab.png',
                    {
                        w,
                        h,
                        x: 0,
                        y: 0,
                    },
                )
                if (!isAll) {
                    await drawImg(canvas, ctx, shareBillRtBf, {
                        w: 248,
                        h: 132,
                        x: w - 248,
                        y: 0,
                    })
                }
                top += 28 + 36
                ctx.font = `normal bold ${36 * scale}px arial,sans-serif`
                ctx.fillStyle = '#262626'
                await writeText(ctx, {
                    text: formatNickName(nickName),
                    x: 46 * scale,
                    y: top * scale,
                })

                top += 20 + 16
                ctx.font = `400 ${24 * scale}px JDZhengHT-Regular`
                ctx.fillStyle = '#5e5e5e'
                const numDan = `共${num}单`
                let left = await getTextWidth(ctx, numDan)
                await writeText(ctx, {
                    text: numDan,
                    x: (w - left) / 2,
                    y: top * scale,
                })

                top += 1 + 64
                ctx.font = `400 ${26 * scale}px JDZhengHT-Bold`
                ctx.fillStyle = '#FF5C0B'
                left = await getTextWidth(ctx, '￥')
                const unitWidth = left
                ctx.font = `700 ${64 * scale}px JDZhengHT-Bold`
                left += await getTextWidth(ctx, choiceMoney)
                await writeText(ctx, {
                    text: choiceMoney,
                    x: (w - left) / 2 + unitWidth,
                    y: top * scale,
                })
                ctx.font = `400 ${26 * scale}px JDZhengHT-Bold`
                await writeText(ctx, {
                    text: '￥',
                    x: (w - left) / 2,
                    y: top * scale,
                })

                top += 20 + 16
                ctx.font = `400 ${26 * scale}px JDZhengHT-Bold`
                ctx.fillStyle = '#666666'
                left = await getTextWidth(ctx, time)
                await writeText(ctx, {
                    text: time,
                    x: (w - left) / 2,
                    y: top * scale,
                })

                canvasToTempFilePath({
                    width: w,
                    height: h,
                    destWidth: w,
                    destHeight: h,
                    canvas,
                    fileType: 'jpg',
                })
                    .then((res) => {
                        const day = dayjs()
                        const mm = day.format('MM')
                        const dd = day.format('DD')
                        let title = ''
                        if (showTotalPrice) {
                            if (isAll) {
                                title = `截止${mm}月${dd}日最新账单如下，全部账单将同时更新！`
                            } else {
                                title = `${debtorMoney - choiceMoney}+${choiceMoney}=${debtorMoney},${mm}月${dd}日最新账单如下↓`
                            }
                        } else {
                            title = '你有新的账单请查看'
                        }
                        resolve({
                            title: title,
                            path: `${PATH_URL.SHARE_BILLING_DETAILS}?type=${isAll ? 1 : 2}&id=${id}&shareUser=${shareUser}&debtorId=${debtorId}&bookKeepingId=${bookKeepingId}&isShare=true&shareUserId=${shareUserId}&inviteId=${inviteId}&sharePrice=${sharePrice}&showQuotaJin=${showQuotaJin}&showPurchase=${showPurchase}`,
                            imageUrl: res.tempFilePath,
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } catch (err) {
                console.log('err => ', err)
            }
        })()
    })
}

// 邀请客户成为会员
export function inviteVip(props: { name: string; id: string }) {
    return new Promise<typeof shareOption>((resolve) => {
        const scale = 2
        ;(async () => {
            try {
                const {
                    data: { bookKeepingName },
                } = await getStorage({ key: BOOK_INFO })
                const w = 420 * scale
                const h = 336 * scale
                let top = 0
                const { canvas, ctx } = await createCanvas('#myCanvas', {
                    w,
                    h,
                })
                await drawImg(
                    canvas,
                    ctx,
                    'https://remember-quick.oss-cn-chengdu.aliyuncs.com/app/7feb5644c829aea371257bd67b76eda3.png',
                    {
                        w,
                        h,
                        x: 0,
                        y: 0,
                    },
                )
                top += 108 + 28
                ctx.font = `normal bold ${30 * scale}px arial,sans-serif`
                ctx.fillStyle = '#ffffff'
                await writeText(ctx, {
                    text: props.name,
                    x: 41 * scale,
                    y: top * scale,
                })
                canvasToTempFilePath({
                    width: w,
                    height: h,
                    destWidth: w,
                    destHeight: h,
                    canvas,
                    fileType: 'jpg',
                })
                    .then((res) => {
                        resolve({
                            title: `点击加入${bookKeepingName}档口会员，实时查看账单信息`,
                            path: `${PATH_URL.BUYER_CENTER}?shareVip=${true}&id=${props.id}`,
                            imageUrl: res.tempFilePath,
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } catch (err) {
                console.log(err)
            }
        })()
    })
}

/**
 * 协作邀请
 * @param props
 * @param {string} props.nickName 当前用户名称
 * @param {string} props.marketName 档口名称
 * @param {number} props.id 分享id
 */
export function bookShare(props: {
    nickName: string
    marketName: string
    id: number
}) {
    const { nickName, marketName } = props
    return new Promise<typeof shareOption>((resolve) => {
        const scale = 2
        ;(async () => {
            try {
                const w = 420 * scale
                const h = 336 * scale
                let top = 0
                const { canvas, ctx } = await createCanvas('#myCanvas', {
                    w,
                    h,
                })
                await drawImg(
                    canvas,
                    ctx,
                    'https://remember-quick.oss-cn-chengdu.aliyuncs.com/app/7ddb4715cd12491d526a9e68c8f649a9.png',
                    {
                        w,
                        h,
                        x: 0,
                        y: 0,
                    },
                )
                top += 95 + 28
                ctx.font = `normal 500 ${24 * scale}px -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif`
                ctx.fillStyle = '#666666'
                await writeText(ctx, {
                    text: `${formatNickName(nickName)}邀请你加入`,
                    x: 35 * scale,
                    y: top * scale,
                })
                top += 44 + 10
                ctx.font = `normal 600 ${36 * scale}px -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif`
                ctx.fillStyle = '#262626'
                await writeText(ctx, {
                    text: formatText(marketName, [7, 0, 7]),
                    x: 35 * scale,
                    y: top * scale,
                })
                canvasToTempFilePath({
                    width: w,
                    height: h,
                    destWidth: w,
                    destHeight: h,
                    canvas,
                    fileType: 'jpg',
                })
                    .then((res) => {
                        const title = '点击加入档口会员，实时查看账单信息'
                        resolve({
                            title,
                            path: `${PATH_URL.COLLABORATION_INVITATION}?id=${props.id}`,
                            imageUrl: res.tempFilePath,
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } catch (err) {
                console.log(err)
            }
        })()
    })
}

export function agentShare(props?: {
    agentUserInfo?: RES.AgentUserInfo
    id?: string
}) {
    const { agentUserInfo, id } = props
    return new Promise<typeof shareOption>((resolve) => {
        const scale = 2
        ;(async () => {
            try {
                const w = 420 * scale
                const h = 336 * scale
                let top = 0
                const { canvas, ctx } = await createCanvas('#myCanvas', {
                    w,
                    h,
                })
                await drawImg(
                    canvas,
                    ctx,
                    'https://remember-quick.oss-cn-chengdu.aliyuncs.com/app/c88e1d027b004a2c5170c8e8bd7d5ed4.png',
                    {
                        w,
                        h,
                        x: 0,
                        y: 0,
                    },
                )
                top += 80 + 52
                ctx.font = `normal 500 ${24 * scale}px -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif`
                ctx.fillStyle = '#262626'
                let text = `${agentUserInfo?.realName}邀请您使用记得快`
                let textWidth = await getTextWidth(ctx, text)
                await writeText(ctx, {
                    text,
                    x: (w - textWidth) / 2,
                    y: top * scale,
                })
                top += 8
                ctx.lineWidth = 2
                ctx.strokeStyle = '#262626'
                ctx.beginPath()
                ctx.moveTo((w - textWidth) / 2, top * scale)
                ctx.lineTo((w - textWidth) / 2 + textWidth, top * scale)
                ctx.closePath()
                ctx.stroke()
                top += 52 - 8
                text = '并申请成为您的专属客服'
                textWidth = await getTextWidth(ctx, text)
                await writeText(ctx, {
                    text,
                    x: (w - textWidth) / 2,
                    y: top * scale,
                })
                top += 8
                ctx.lineWidth = 2
                ctx.strokeStyle = '#262626'
                ctx.beginPath()
                ctx.moveTo((w - textWidth) / 2, top * scale)
                ctx.lineTo((w - textWidth) / 2 + textWidth, top * scale)
                ctx.closePath()
                ctx.stroke()
                canvasToTempFilePath({
                    width: w,
                    height: h,
                    destWidth: w,
                    destHeight: h,
                    canvas,
                    fileType: 'jpg',
                })
                    .then((res) => {
                        const title = `${agentUserInfo?.realName}邀请你成为档口VIP`
                        resolve({
                            title,
                            path: `${PATH_URL.AGENCY_INVITATION}?id=${id}`,
                            imageUrl: res.tempFilePath,
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } catch (err) {
                console.log(err)
            }
        })()
    })
}

/**
 * 分享账本
 */
export function bookAllShare(props: {
    bookId: number
    agentUserInfo: string
    icon: string
    bookName: string
    che: string
    time: string
    gateName: string
    showAdditional: boolean
    showPurchase: boolean
    showSalesDetail: boolean
}) {
    const {
        bookId,
        icon,
        bookName,
        che,
        time,
        gateName,
        showAdditional,
        showPurchase,
        showSalesDetail,
    } = props
    return new Promise<typeof shareOption>((resolve) => {
        const scale = 2
        ;(async () => {
            try {
                const w = 420 * scale
                const h = 336 * scale
                let top = 0
                const { canvas, ctx } = await createCanvas('#myCanvas', {
                    w,
                    h,
                })
                await drawImg(
                    canvas,
                    ctx,
                    'https://remember-quick.oss-cn-chengdu.aliyuncs.com/app/98405ef498b217252d4eb30bf062971b.png',
                    {
                        w,
                        h,
                        x: 0,
                        y: 0,
                    },
                )
                let left = 38
                top += 43
                await drawImg(canvas, ctx, icon, {
                    w: 44 * scale,
                    h: 44 * scale,
                    x: left * scale,
                    y: top * scale + 10,
                })
                left += 48
                left += 10
                top += 40
                ctx.font = `normal 800 ${35 * scale}px -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif`
                ctx.fillStyle = '#262626'
                await writeText(ctx, {
                    text: formatText(bookName, [5, 0, 5]),
                    x: left * scale - 10,
                    y: top * scale,
                })
                ctx.font = `normal 500 ${30 * scale}px JDZhengHT-Regular`
                ctx.fillStyle = '#4D4D4D'
                await writeText(ctx, {
                    text: che,
                    x: 330 * scale,
                    y: top * scale,
                })
                top += 18
                top += 28
                top += 15
                ctx.font = `normal 500 ${28 * scale}px JDZhengHT-Regular`
                ctx.fillStyle = '#262626'
                await writeText(ctx, {
                    text: time,
                    x: 42 * scale,
                    y: top * scale,
                })
                top += 14
                top += 22
                top += 15
                ctx.font = `normal 400 ${22 * scale}px -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif`
                ctx.fillStyle = '#AAAAAA'
                await writeText(ctx, {
                    text: gateName,
                    x: 42 * scale,
                    y: top * scale,
                })
                canvasToTempFilePath({
                    width: w,
                    height: h,
                    destWidth: w,
                    destHeight: h,
                    canvas,
                    fileType: 'jpg',
                })
                    .then((res) => {
                        // const title = `${agentUserInfo}邀请你成为档口VIP`
                        const title = '点击可查看该账本结算数据汇总'
                        resolve({
                            title,
                            path: `${PATH_URL.SHARE_BOOK}?bookId=${bookId}&showAdditional=${showAdditional}&showPurchase=${showPurchase}&showSalesDetail=${showSalesDetail}`,
                            imageUrl: res.tempFilePath,
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } catch (err) {
                console.log(err)
            }
        })()
    })
}

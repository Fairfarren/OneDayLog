import { chooseMedia } from '@tarojs/taro'
import { usePrintOnline } from '@/hooks/printer'
import { usePrinterInfo } from '@/store/printer'
import { showLoading, showToast, uploadOSS } from '@/utils'

export function useOnlinePrint() {
    const { printOnline } = usePrintOnline()

    async function useImage() {
        console.log('useOnlinePrint', usePrinterInfo.getState())
        if (!usePrinterInfo.getState().print_id) {
            showToast({
                icon: 'error',
                title: '请先绑定打印机',
            })
            return
        }
        showLoading({
            title: '连接中...',
        })
        try {
            const res = await chooseMedia({
                mediaType: ['image'],
            })

            const url = await uploadOSS(res.tempFiles[0].tempFilePath)

            await printOnline(url)

            return showToast({
                icon: 'success',
                title: '打印成功',
            })
        } catch (err) {
            console.log(err)
            return showToast({
                icon: 'error',
                title: '打印失败',
            })
        }
    }

    return {
        useImage,
    }
}

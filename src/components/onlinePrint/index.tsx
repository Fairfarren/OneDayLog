import { Image, Text, View } from '@tarojs/components'
import classnames from 'classnames'
import iconCameraOrange from '@/assets/icon/camera-orange.svg'
import iconCopyGreen from '@/assets/icon/copy-green.svg'
import iconLogBlue from '@/assets/icon/log-blue.svg'
import iconMicroBlue from '@/assets/icon/micro-blue.svg'
import { ButtonBlue } from '@/components/layoutButton'
import PATH_URL from '@/const/path'
import { navigateTo, showToast } from '@/utils'
import { useOnlinePrint } from './track'

function OnlinePrint() {
    const { useImage } = useOnlinePrint()

    const list = [
        {
            img: iconCameraOrange,
            title: '上传图片',
            onClick: useImage,
        },
        {
            img: iconMicroBlue,
            title: '语音识别',
            onClick: () => {
                showToast({
                    title: '敬请期待',
                })
            },
        },
        {
            img: iconCopyGreen,
            title: '粘贴文本',
            onClick: () => {
                showToast({
                    title: '敬请期待',
                })
            },
        },
    ]

    return (
        <View className={classnames()}>
            <View
                className={classnames(
                    'w-full',
                    'flex',
                    'items-center',
                    'justify-between',
                    'text-[32px]',
                )}
            >
                <View className={classnames('text-black')}>
                    <Text>在线打印</Text>
                    <Text className={classnames('text-[28px]', 'text-gray-8c')}>
                        （2积分 = 1次打印）
                    </Text>
                </View>
                <View>
                    <ButtonBlue
                        title="打印记录"
                        img={iconLogBlue}
                        onClick={() => navigateTo(PATH_URL.PRINT_LOG)}
                    />
                </View>
            </View>
            <View
                className={classnames(
                    'bg-bg',
                    'px-2',
                    'py-3',
                    'rounded-md',
                    'flex',
                    'items-center',
                    'justify-between',
                    'mt-2',
                    'text-[28px]',
                )}
            >
                {list.map((item, index) => (
                    <View
                        key={index}
                        className={classnames('text-center')}
                        onClick={item?.onClick}
                    >
                        <View>
                            <Image
                                className={classnames('w-[64px]', 'h-[64px]')}
                                src={item.img}
                            />
                        </View>
                        <View
                            className={classnames('text-black', 'text-[28px]')}
                        >
                            {item.title}
                        </View>
                    </View>
                ))}
            </View>
        </View>
    )
}

export default OnlinePrint

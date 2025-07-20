import { useTime } from '@/store/time'
import { Overlay, PickerView } from '@nutui/nutui-react-taro'
import { Button, Text, View } from '@tarojs/components'
import classnames from 'classnames'
import { useState } from 'react'

const list1 = Array(80)
    .fill(null)
    .map((_, i) => ({
        value: 2020 + i,
        label: 2020 + i + '年',
    }))
const list2 = Array(12)
    .fill(null)
    .map((_, i) => ({
        value: i + 1,
        label: i + 1 + '月',
    }))

const listData = [list1, list2]

function TimeTitle() {
    const time = useTime()
    const [visible, setVisible] = useState(false)

    return (
        <>
            <View
                className={classnames(
                    'text-2xl',
                    'text-primary',
                    'text-center',
                    'flex',
                    'items-center',
                    'justify-center',
                    'gap-1',
                )}
                onClick={() => setVisible(true)}
            >
                <Text>
                    {time.year} - {String(time.month).padStart(2, '0')}
                </Text>
                <Text
                    className={classnames('myicon', 'myicon-unfold', 'text-xl')}
                ></Text>
            </View>

            <Overlay visible={visible} lockScroll>
                <View
                    className={classnames(
                        'w-full',
                        'h-full',
                        'flex',
                        'items-center',
                        'justify-center',
                    )}
                >
                    <View
                        className={classnames(
                            'w-[650px]',
                            'rounded-xl',
                            'bg-base-100',
                            'overflow-hidden',
                            'px-3',
                            'py-2',
                            'grid',
                            'gap-2',
                            'grid-rows-[auto_1fr_auto]',
                        )}
                    >
                        <View
                            className={classnames(
                                'text-center',
                                'font-bold',
                                'text-xl',
                            )}
                        >
                            选择月份
                        </View>
                        <PickerView
                            options={listData}
                            className={classnames('!w-full', '!h-full')}
                            defaultValue={[time.year, time.month]}
                            onChange={(e) => {
                                console.log(e)
                            }}
                        />
                        <View
                            className={classnames(
                                'flex',
                                'items-center',
                                'justify-evenly',
                            )}
                        >
                            <Button
                                className={classnames(
                                    'btn btn-active btn-ghost',
                                )}
                            >
                                取消
                            </Button>
                            <Button className={classnames('btn btn-success')}>
                                确定
                            </Button>
                        </View>
                    </View>
                </View>
            </Overlay>
        </>
    )
}

export default TimeTitle

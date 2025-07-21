import iconUnfoldLight from '@/assets/icon/unfold-light.svg'
import iconUnfold from '@/assets/icon/unfold.svg'
import { useSystem } from '@/store/system'
import { useTime } from '@/store/time'
import { Overlay } from '@nutui/nutui-react-taro'
import {
    Button,
    Image,
    PickerView,
    PickerViewColumn,
    Text,
    View,
} from '@tarojs/components'
import classnames from 'classnames'
import { memo, useEffect, useState } from 'react'

const list1 = Array(80)
    .fill(null)
    .map((_, i) => ({
        value: 2000 + i,
        label: 2000 + i + '年',
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
    const system = useSystem()
    const [visible, setVisible] = useState(false)
    const [tmpValue, setTempValue] = useState<number[]>([])

    function updateTime() {
        time.reset(`${list1[tmpValue[0]].value}-${list2[tmpValue[1]].value}`)
        setVisible(false)
    }

    function backToDay(e) {
        e.stopPropagation()
        time.reset(time.today)
    }

    useEffect(() => {
        const value1 = list1.findIndex((item) => item.value === time.year)
        const value2 = list2.findIndex((item) => item.value === time.month)
        setTempValue([value1, value2])
    }, [time])

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
                    'relative',
                )}
                onClick={() => setVisible(true)}
            >
                <Text>
                    {time.year} - {String(time.month).padStart(2, '0')}
                </Text>
                <Image
                    src={system.theme === 'dark' ? iconUnfold : iconUnfoldLight}
                    className={classnames('w-4', 'h-4')}
                />

                <View
                    className={classnames(
                        'absolute',
                        'right-0',
                        'top-1/2',
                        '-translate-y-1/2',
                        'text-lg',
                        'transition',
                        `${time.year}-${time.month}-${time.day}` === time.today
                            ? 'text-base-content text-opacity-50'
                            : 'text-primary',
                    )}
                    onClick={backToDay}
                >
                    今
                </View>
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
                            'h-[900px]',
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
                            className={classnames('!w-full', '!h-full')}
                            value={tmpValue}
                            onChange={(e) => {
                                setTempValue([
                                    e.detail.value[0],
                                    e.detail.value[1],
                                ])
                            }}
                            indicatorClass="indHeight"
                            mask-class="picker-mask"
                        >
                            {listData.map((list, i) => (
                                <PickerViewColumn key={i}>
                                    {list.map((item, ii) => (
                                        <View
                                            key={ii}
                                            className={classnames(
                                                'w-full',
                                                'h-full',
                                                'flex',
                                                'items-center',
                                                'justify-center',
                                                'text-lg',
                                                i === 0
                                                    ? ii === tmpValue[0] &&
                                                          '!text-accent'
                                                    : ii === tmpValue[1] &&
                                                          '!text-accent',
                                            )}
                                        >
                                            {item.label}
                                        </View>
                                    ))}
                                </PickerViewColumn>
                            ))}
                        </PickerView>
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
                                onClick={() => {
                                    setVisible(false)
                                }}
                            >
                                取消
                            </Button>
                            <Button
                                className={classnames('btn btn-success')}
                                onClick={updateTime}
                            >
                                确定
                            </Button>
                        </View>
                    </View>
                </View>
            </Overlay>
        </>
    )
}

export default memo(TimeTitle)

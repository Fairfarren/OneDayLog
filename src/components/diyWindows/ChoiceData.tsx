import { useWindowsConfig } from '@/store/system'
import { useTime } from '@/store/time'
import { Button, PickerView, PickerViewColumn, View } from '@tarojs/components'
import classnames from 'classnames'
import { useEffect, useState } from 'react'

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

function ChoiceData() {
    const windowsConfig = useWindowsConfig()
    const [tmpValue, setTempValue] = useState<number[]>([])
    const time = useTime()

    function updateTime() {
        time.reset(`${list1[tmpValue[0]].value}-${list2[tmpValue[1]].value}`)
        windowsConfig.close()
    }

    useEffect(() => {
        const value1 = list1.findIndex((item) => item.value === time.year)
        const value2 = list2.findIndex((item) => item.value === time.month)
        setTempValue([value1, value2])
    }, [time])

    return (
        <View
            className={classnames(
                'w-full',
                'h-full',
                'flex',
                'items-center',
                'justify-center',
            )}
            onClick={() => windowsConfig.close()}
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
                onClick={(e) => {
                    e.stopPropagation()
                }}
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
                        setTempValue([e.detail.value[0], e.detail.value[1]])
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
                        className={classnames('btn btn-active btn-ghost')}
                        onClick={() => {
                            windowsConfig.close()
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
    )
}

export default ChoiceData

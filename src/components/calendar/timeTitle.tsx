import { useTime } from '@/store/time'
import { Popup } from '@nutui/nutui-react-taro'
import { PickerView, PickerViewColumn, View } from '@tarojs/components'
import classnames from 'classnames'
import { useState } from 'react'

const list1 = [1, 2, 3]
const list2 = [1, 2, 3]

function TimeTitle() {
    const time = useTime()
    const [visible, setVisible] = useState(false)

    return (
        <>
            <View
                className={classnames(
                    'text-center',
                    'text-2xl',
                    'text-primary',
                )}
                onClick={() => setVisible(true)}
            >
                {time.year} - {time.month}
            </View>

            <Popup
                visible={visible}
                position="bottom"
                style={{ height: '300px' }}
                onClose={() => {
                    setVisible(false)
                }}
                lockScroll
            >
                <View className={classnames('w-full', 'h-full', 'bg-base-100')}>
                    <PickerView
                        indicator-style="height: 50px;"
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        className={classnames('w-full')}
                        indicatorClass={'indHeight'}
                        immediateChange
                        mask-class="picker-mask"
                        onChange={(e) => {
                            console.log(e)
                        }}
                        value={time.year}
                    >
                        <PickerViewColumn>
                            {list1.map((item, index) => (
                                <View
                                    key={index}
                                    className={classnames(
                                        'flex',
                                        'items-center',
                                        'justify-center',
                                    )}
                                >
                                    {item}
                                </View>
                            ))}
                        </PickerViewColumn>
                        <PickerViewColumn>
                            {list2.map((item, index) => (
                                <View key={index}>{item}</View>
                            ))}
                        </PickerViewColumn>
                    </PickerView>
                </View>
            </Popup>
        </>
    )
}

export default TimeTitle

import iconUnfoldLight from '@/assets/icon/unfold-light.svg'
import iconUnfold from '@/assets/icon/unfold.svg'
import { useSystem, useWindowsConfig, WindowType } from '@/store/system'
import { useTime } from '@/store/time'
import { Image, Text, View } from '@tarojs/components'
import classnames from 'classnames'
import { memo } from 'react'

function TimeTitle() {
    const time = useTime()
    const system = useSystem()

    function backToDay(e) {
        e.stopPropagation()
        time.reset(time.today)
    }

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
                onClick={() =>
                    useWindowsConfig.getState().open(WindowType.选择日期)
                }
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
        </>
    )
}

export default memo(TimeTitle)

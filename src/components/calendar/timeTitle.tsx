import iconUnfoldLight from '@/assets/icon/unfold-light.svg'
import iconUnfold from '@/assets/icon/unfold.svg'
import { useEventInfo } from '@/store/event'
import { useSystem, useWindowsConfig, WindowType } from '@/store/system'
import { useTime } from '@/store/time'
import { Image, ShareElement, Text, View } from '@tarojs/components'
import classnames from 'classnames'
import { memo } from 'react'

function TimeTitle(props?: { showDay?: boolean }) {
    const time = useTime()
    const system = useSystem()
    const eventInfo = useEventInfo()

    function backToDay(e) {
        e.stopPropagation()
        time.reset(time.today)
    }

    function openWindow(e) {
        e.stopPropagation()
        if (eventInfo.id) {
            return
        }

        useWindowsConfig.getState().open(WindowType.选择日期)
    }

    return (
        <ShareElement
            mapkey="TimeTiele"
            transform
            className={classnames(
                'w-full',
                'text-2xl',
                'font-bold',
                'text-primary',
                'flex',
                'items-center',
                'gap-1',
                !eventInfo.id ? 'justify-between' : 'justify-center',
            )}
            onClick={openWindow}
        >
            <View className={classnames('flex', 'items-center', 'gap-1')}>
                <Text>
                    {time.year} - {String(time.month).padStart(2, '0')}
                    {props?.showDay &&
                        `- ${String(time.choiceDay.split('-').at(-1)).padStart(2, '0')}`}
                </Text>
                {!eventInfo.id && (
                    <Image
                        src={
                            system.theme === 'dark'
                                ? iconUnfold
                                : iconUnfoldLight
                        }
                        className={classnames('w-4', 'h-4')}
                    />
                )}
            </View>

            {!eventInfo.id && (
                <View
                    className={classnames(
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
            )}
        </ShareElement>
    )
}

export default memo(TimeTitle)

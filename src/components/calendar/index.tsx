import DaysCom from '@/components/calendar/daysCom'
import TimeTitle from '@/components/calendar/timeTitle'
import { useTime } from '@/store/time'
import { Swiper, SwiperItem, View } from '@tarojs/components'
import classnames from 'classnames'
import { useState } from 'react'
import Week from './week'

function Calendar() {
    const time = useTime()
    const [config, setConfig] = useState({
        duration: 500,
        current: 1,
    })

    function changeTime(e) {
        console.log('onChange')
        setConfig((data) => ({
            ...data,
            current: e.detail.current,
        }))
    }

    function onFinish(e) {
        let month = time.month
        let year = time.year
        setConfig((data) => ({
            ...data,
            duration: 0,
        }))
        setTimeout(() => {
            setConfig({
                duration: 500,
                current: 1,
            })
            setTimeout(() => {
                if (e.detail.current < 1) {
                    month = month - 1
                } else if (e.detail.current > 1) {
                    month = month + 1
                }
                if (month < 1) {
                    month = 12
                    year = year - 1
                } else if (month > 12) {
                    month = 1
                    year = year + 1
                }
                time.update({
                    year,
                    month,
                })
            })
        }, 0)
    }

    return (
        <View
            className={classnames(
                'box',
                'text-center',
                '!bg-transparent',
                '!shadow-none',
            )}
        >
            <TimeTitle />

            <Week />

            <Swiper
                {...config}
                style={{
                    height: '430rpx',
                }}
                onChange={changeTime}
                onAnimationFinish={onFinish}
            >
                <SwiperItem>
                    <DaysCom month={time.month - 1} />
                </SwiperItem>
                <SwiperItem>
                    <DaysCom month={time.month} />
                </SwiperItem>
                <SwiperItem>
                    <DaysCom month={time.month + 1} />
                </SwiperItem>
            </Swiper>
        </View>
    )
}

export default Calendar

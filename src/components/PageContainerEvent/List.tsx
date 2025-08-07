import DiyHeader from '@/components/diyHeader'
import EventCard from '@/components/eventCard'
import { useGetEventList } from '@/hooks/event'
import { ClassEventInfo, useEventInfo } from '@/store/event'
import { ScrollView, ShareElement, View } from '@tarojs/components'
import classnames from 'classnames'
import { useMemo } from 'react'

function List(props: { name: ClassEventInfo['title'] }) {
    const { list } = useGetEventList()

    const getList = useMemo(() => {
        const arr: typeof list = []
        list?.forEach((item) => {
            if (item.title === props.name) {
                arr.push(item)
            }
        })

        return arr
    }, [props.name, list])

    return (
        <View className={classnames('bg-base-200')}>
            <DiyHeader>
                <ShareElement
                    onClick={() => {
                        useEventInfo.getState().close()
                    }}
                    mapkey={props.name}
                    transform
                    className={classnames(
                        'flex',
                        'items-center',
                        'text-primary',
                        'text-3xl',
                        'font-bold',
                    )}
                >
                    {props.name}
                </ShareElement>
            </DiyHeader>
            <ScrollView
                scrollY
                className={classnames(
                    'container',
                    'w-screen',
                    'h-screen',
                    'box-border',
                )}
            >
                {getList.map((item, index) => (
                    <EventCard
                        onClick={() => {
                            useEventInfo.getState().open(item)
                        }}
                        showShadow
                        key={index}
                        data={item}
                    />
                ))}
                <View className="occupy-bottom" />
            </ScrollView>
        </View>
    )
}

export default List

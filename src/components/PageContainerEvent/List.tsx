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

    function afterLongPress() {
        // 因为请求之后这里拿到的getList还没有被刷新，所以length用1
        if (getList.length > 1) {
            useEventInfo.getState().reset({
                title: props.name,
                show: true,
            })
        } else {
            useEventInfo.getState().reset()
        }
    }

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
                        afterLongPress={afterLongPress}
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

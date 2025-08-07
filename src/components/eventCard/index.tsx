import { useDoEventDelete } from '@/hooks/event'
import { ClassEventInfo, useEventInfo } from '@/store/event'
import { showLoading, showModal } from '@/utils'
import { ShareElement, Text, View } from '@tarojs/components'
import { hideLoading } from '@tarojs/taro'
import classnames from 'classnames'
import dayjs from 'dayjs'
import { memo } from 'react'

type Data = Omit<ClassEventInfo, 'show'>

function EventCard(props: {
    data: Data
    onClick?: (_: Data) => void
    showShadow: boolean
}) {
    const { doEventDelete } = useDoEventDelete()

    function onLongPress() {
        showModal({
            title: '提示',
            content: '是否删除？',
        }).then(async () => {
            showLoading({
                title: '删除中...',
            })
            await doEventDelete({
                eventId: props.data.id,
                tagsId: props.data.eventTags.map((eventTag) => eventTag.tagId),
            })
            hideLoading()
            useEventInfo.getState().reset()
        })
    }

    return (
        <View
            className={classnames(
                'box',
                !props.showShadow && '!shadow-none !p-0 mt-0',
            )}
            onClick={(e) => {
                e.stopPropagation()
                props.onClick?.(props.data)
            }}
            onLongPress={onLongPress}
        >
            <ShareElement
                className={classnames('text-xl', 'font-bold', 'text-primary')}
                transform
                mapkey={`EventCard-title-${props.data.id}`}
            >
                <Text>{props.data.title}</Text>
            </ShareElement>
            <ShareElement
                transform
                mapkey={`EventCard-Sub-${props.data.id}`}
                className={classnames(
                    'mt-2',
                    'text-lg',
                    'w-full',
                    'text-opacity-80',
                    props.showShadow && 'truncate',
                )}
            >
                {props.data.notes}
            </ShareElement>
            {props.showShadow && (
                <View className={classnames('mt-1', 'text-sm')}>
                    {dayjs(props.data.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                </View>
            )}
            <ShareElement
                transform
                mapkey={`EventCard-tag-${props.data.id}`}
                className={classnames('mt-2', 'flex', 'flex-wrap', 'gap-2')}
            >
                {props.data.eventTags.map((tag, i) => (
                    <View
                        className={classnames('badge', 'badge-neutral')}
                        key={i}
                    >
                        # {tag.tag.name}
                    </View>
                ))}
            </ShareElement>
        </View>
    )
}

export default memo(EventCard)

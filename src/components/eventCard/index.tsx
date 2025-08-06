import { ClassEventInfo } from '@/store/event'
import { ShareElement, Text, View } from '@tarojs/components'
import classnames from 'classnames'
import { memo } from 'react'

type Data = Omit<ClassEventInfo, 'show'>

function EventCard(props: {
    data: Data
    onClick?: (_: Data) => void
    showShadow: boolean
}) {
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

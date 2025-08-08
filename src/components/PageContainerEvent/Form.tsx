import { Input, Textarea, View } from '@tarojs/components'
import classnames from 'classnames'
import { forwardRef, useImperativeHandle, useState } from 'react'

export interface FormRef {
    addTag: (tag: string) => void
    getTags: () => string[]
    clear: () => void
}

function FormCom(
    props: {
        openTag: () => void
    },
    ref,
) {
    const [tags, setTags] = useState<string[]>([])

    const formObj = [
        {
            key: 'title',
            label: '名称',
            com: <Input name="title" placeholder="要记录什么事情" />,
        },
        {
            key: 'notes',
            label: '备注',
            com: <Textarea name="notes" placeholder="还有什么需要备注的吗" />,
        },
        {
            key: 'tag',
            label: '标签',
            com: (
                <>
                    <View
                        className={classnames(
                            'flex',
                            'items-center',
                            'gap-2',
                            'flex-wrap',
                        )}
                    >
                        {tags.map((tag, index) => (
                            <View
                                key={index}
                                className={classnames('badge', 'badge-neutral')}
                            >
                                # {tag}
                            </View>
                        ))}
                        <View
                            className={classnames(
                                'kbd',
                                'kbd-md',
                                'bg-base-100',
                            )}
                            onClick={props.openTag}
                        >
                            +
                        </View>
                    </View>
                </>
            ),
        },
    ]

    function addTag(tag: string) {
        setTags((e) => {
            const set = new Set(e)
            set.add(tag)
            return Array.from(set)
        })
    }

    useImperativeHandle(ref, () => ({
        addTag,
        getTags() {
            return tags
        },
        clear() {
            setTags([])
        },
    }))

    return (
        <>
            {formObj.map((item) => (
                <View
                    key={item.key}
                    className={classnames(
                        'w-full',
                        'flex',
                        'gap-2',
                        'text-lg',
                        'items-start',
                    )}
                >
                    <View
                        className={classnames('font-medium', 'flex-shrink-0')}
                    >
                        {item.label}
                    </View>
                    <View
                        className={classnames('flex-shrink', 'w-full', 'py-1')}
                    >
                        {item.com}
                    </View>
                </View>
            ))}
        </>
    )
}

export default forwardRef(FormCom)

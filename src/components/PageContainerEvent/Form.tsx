import { Input, View } from '@tarojs/components'
import classnames from 'classnames'
import { useImperativeHandle, useState, forwardRef } from 'react'

export interface FormRef {
    addTag: (tag: string) => void
}

const formObj = [
    {
        key: 'title',
        label: '名称',
        placeholder: '要记录什么事情',
    },
    {
        key: 'sub',
        label: '备注',
        placeholder: '还有什么需要备注的吗',
    },
    {
        key: 'tag',
        label: '标签',
    },
]

function FormCom(
    props: {
        openTag: () => void
    },
    ref,
) {
    const [tags, setTags] = useState<string[]>([])

    function addTag(tag: string) {
        setTags((e) => {
            const set = new Set(e)
            set.add(tag)
            return Array.from(set)
        })
    }

    useImperativeHandle(ref, () => ({
        addTag,
    }))

    return (
        <>
            {formObj.map((item) => (
                <View
                    key={item.key}
                    className={classnames(
                        'w-full',
                        'flex',
                        'items-start',
                        'gap-2',
                        'text-lg',
                    )}
                >
                    <View
                        className={classnames('font-medium', 'flex-shrink-0')}
                    >
                        {item.label}
                    </View>
                    <View className={classnames('flex-shrink', 'w-full')}>
                        {item.key === 'tag' ? (
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
                                        className={classnames(
                                            'badge',
                                            'badge-neutral',
                                        )}
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
                        ) : (
                            <Input
                                name={item.key}
                                className={classnames('w-full')}
                                placeholder={item.placeholder}
                            />
                        )}
                    </View>
                </View>
            ))}
        </>
    )
}

export default forwardRef(FormCom)

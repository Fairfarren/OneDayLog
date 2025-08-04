import { useEventInfo } from '@/store/event'
import { Button, Input, View, Form } from '@tarojs/components'
import classnames from 'classnames'

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

function FormCom() {
    return (
        <>
            {formObj.map((item) => (
                <View
                    key={item.key}
                    className={classnames(
                        'w-full',
                        'flex',
                        'items-center',
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
                            <View>tag</View>
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

export default FormCom

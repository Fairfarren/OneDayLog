import TimeTitle from '@/components/calendar/timeTitle'
import { useEventInfo } from '@/store/event'
import { Input, PageContainer, View } from '@tarojs/components'
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

function PageContainerEvent() {
    const eventInfo = useEventInfo()

    return (
        <PageContainer
            show={eventInfo.show}
            position="center"
            overlay={false}
            closeOnSlideDown
            onAfterLeave={() => {
                eventInfo.close()
            }}
        >
            <View
                className={classnames(
                    'w-screen',
                    'h-screen',
                    'flex',
                    'items-center',
                    'justify-center',
                    'bg-base-200',
                )}
            >
                <View
                    className={classnames(
                        'w-[700px]',
                        'px-4',
                        'py-5',
                        'rounded-2xl',
                        'bg-base-100',
                        'shadow-2xl',
                        'box-border',
                    )}
                >
                    <TimeTitle />
                    <View className={classnames('mt-3', 'grid', 'gap-2')}>
                        {formObj.map((item) => (
                            <View
                                key={item.key}
                                className={classnames(
                                    'flex',
                                    'items-center',
                                    'gap-2',
                                    'text-lg',
                                )}
                            >
                                <View className={classnames('font-medium')}>
                                    {item.label}
                                </View>
                                <View>
                                    {item.key === 'tag' ? (
                                        <View>tag</View>
                                    ) : (
                                        <Input
                                            value={eventInfo[item.key]}
                                            onInput={(e) =>
                                                eventInfo.update({
                                                    [item.key]: e.detail.value,
                                                })
                                            }
                                        />
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </PageContainer>
    )
}

export default PageContainerEvent

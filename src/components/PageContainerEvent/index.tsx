import iconCancelLight from '@/assets/icon/cancel-light.svg'
import iconCancel from '@/assets/icon/cancel.svg'
import iconSubmitLight from '@/assets/icon/submit-light.svg'
import iconSubmit from '@/assets/icon/submit.svg'
import TimeTitle from '@/components/calendar/timeTitle'
import EventCard from '@/components/eventCard'
import FormCom, { type FormRef } from '@/components/PageContainerEvent/Form'
import { useDoEventAdd } from '@/hooks/event'
import { useEventInfo } from '@/store/event'
import { useSystem } from '@/store/system'
import { useTime } from '@/store/time'
import { showLoading } from '@/utils'
import { Overlay } from '@nutui/nutui-react-taro'
import {
    Button,
    Form,
    Image,
    Input,
    PageContainer,
    View,
} from '@tarojs/components'
import { hideLoading } from '@tarojs/taro'
import classnames from 'classnames'
import { useEffect, useRef, useState } from 'react'

function PageContainerEvent() {
    const eventInfo = useEventInfo()
    const system = useSystem()
    const [visible, setVisible] = useState(false)
    const form = useRef<FormRef>(null)
    const { doEventAdd } = useDoEventAdd()

    const iconList = [
        {
            dark: iconCancel,
            light: iconCancelLight,
            onClick() {
                eventInfo.close()
            },
        },
    ]

    if (!eventInfo.id) {
        iconList.push({
            dark: iconSubmit,
            light: iconSubmitLight,
            onClick() {},
        })
    }

    async function submit(e) {
        e.preventDefault()
        showLoading({
            title: '创建中...',
        })
        await doEventAdd({
            title: e.detail.value.title,
            notes: e.detail.value.notes,
            tags: form.current?.getTags() || [],
            createdAt: useTime.getState().choiceDay,
        })
        eventInfo.close()
        hideLoading()
    }

    useEffect(() => {
        if (!eventInfo.show) {
            form.current?.clear()
        }
    }, [eventInfo])

    return (
        <PageContainer
            show={eventInfo.show}
            position="center"
            overlay={false}
            closeOnSlideDown
            onAfterLeave={() => {
                eventInfo.reset()
            }}
        >
            <Form
                onSubmit={submit}
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
                        '-translate-y-[20%]',
                        'w-[700px]',
                        'px-4',
                        'py-5',
                        'rounded-2xl',
                        'bg-base-100',
                        'shadow-2xl',
                        'box-border',
                        'relative',
                    )}
                >
                    <TimeTitle showDay />
                    <View className={classnames('mt-3', 'grid', 'gap-4')}>
                        {eventInfo.id ? (
                            <EventCard data={eventInfo} showShadow={false} />
                        ) : (
                            <FormCom
                                ref={form}
                                openTag={() => setVisible(true)}
                            />
                        )}
                    </View>

                    <View
                        className={classnames(
                            'absolute',
                            'w-full',
                            '-bottom-20',
                            'left-0',
                            'flex',
                            'items-center',
                            'justify-around',
                        )}
                    >
                        {iconList.map((icon, index) => (
                            <Button
                                className={classnames(
                                    'default-button',
                                    'w-12',
                                    'h-12',
                                    'rounded-full',
                                )}
                                key={index}
                                formType={index === 1 ? 'submit' : undefined}
                                onClick={icon.onClick}
                            >
                                <Image
                                    key={index}
                                    src={
                                        system.theme === 'dark'
                                            ? icon.dark
                                            : icon.light
                                    }
                                    onClick={icon.onClick}
                                    className={classnames('w-full', 'h-full')}
                                />
                            </Button>
                        ))}
                    </View>
                </View>
            </Form>
            <Overlay visible={visible}>
                <View
                    className={classnames(
                        'w-screen',
                        'h-screen',
                        'flex',
                        'items-center',
                        'justify-center',
                    )}
                    onClick={(e) => {
                        e.stopPropagation()
                        setVisible(false)
                    }}
                >
                    <Form
                        className={classnames(
                            'box',
                            'w-[650px]',
                            'py-5',
                            'px-3',
                            'box-border',
                        )}
                        onSubmit={(e) => {
                            e.preventDefault()
                            if (e.detail.value?.tag) {
                                form.current?.addTag(e.detail.value.tag)
                            }
                            setVisible(false)
                        }}
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                    >
                        <View>
                            <Input
                                className={classnames('w-full', 'text-base')}
                                placeholder="输入标签名称"
                                name="tag"
                            />
                        </View>
                        <View
                            className={classnames(
                                'flex',
                                'justify-center',
                                'mt-3',
                            )}
                        >
                            <Button
                                className={classnames(
                                    'btn',
                                    'btn-primary',
                                    '!h-auto',
                                    '!py-2',
                                    '!min-h-1',
                                )}
                                formType="submit"
                            >
                                确认
                            </Button>
                        </View>
                    </Form>
                </View>
            </Overlay>
        </PageContainer>
    )
}

export default PageContainerEvent

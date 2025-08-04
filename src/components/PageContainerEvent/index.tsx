import iconCancelLight from '@/assets/icon/cancel-light.svg'
import iconCancel from '@/assets/icon/cancel.svg'
import iconSubmitLight from '@/assets/icon/submit-light.svg'
import iconSubmit from '@/assets/icon/submit.svg'
import TimeTitle from '@/components/calendar/timeTitle'
import EventCard from '@/components/eventCard'
import FormCom from '@/components/PageContainerEvent/Form'
import { useEventInfo } from '@/store/event'
import { useSystem } from '@/store/system'
import { Button, Form, Image, PageContainer, View } from '@tarojs/components'
import classnames from 'classnames'

function PageContainerEvent() {
    const eventInfo = useEventInfo()
    const system = useSystem()

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
                onSubmit={(e) => {
                    e.preventDefault()
                    console.log('Form submitted', e)
                }}
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
                            <FormCom />
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
        </PageContainer>
    )
}

export default PageContainerEvent

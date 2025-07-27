import TimeTitle from '@/components/calendar/timeTitle'
import EventCard from '@/components/eventCard'
import Form from '@/components/PageContainerEvent/Form'
import { useEventInfo } from '@/store/event'
import { PageContainer, View } from '@tarojs/components'
import classnames from 'classnames'

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
                        {eventInfo.id ? (
                            <EventCard data={eventInfo} showShadow={false} />
                        ) : (
                            <Form />
                        )}
                    </View>
                </View>
            </View>
        </PageContainer>
    )
}

export default PageContainerEvent

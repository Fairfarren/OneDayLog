import DiyHeader from '@/components/diyHeader'
import { Share } from '@/components/share'
import { Button, Text, View } from '@tarojs/components'
import classnames from 'classnames'

const Index = () => {
    return (
        <Share>
            <DiyHeader>
                <View className={classnames('text-base-content')}>
                    <Text>记时薄</Text>
                </View>
            </DiyHeader>
            <View>
                <Button className="btn btn-active">Default</Button>
                <Button className="btn btn-active btn-neutral">Neutral</Button>
                <Button className="btn btn-active btn-primary">Primary</Button>
                <Button className="btn btn-active btn-secondary">
                    Secondary
                </Button>
                <Button className="btn btn-active btn-accent">Accent</Button>
                <Button className="btn btn-active btn-ghost">Ghost</Button>
                <Button className="btn btn-active btn-error">btn-error</Button>
                <Button className="btn btn-active btn-warning">
                    btn-warning
                </Button>
                <Button className="btn btn-active btn-link">Link</Button>
            </View>
        </Share>
    )
}

export default Index

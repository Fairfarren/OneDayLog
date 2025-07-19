import { Button, View } from '@tarojs/components'
import classnames from 'classnames'

const Index = () => {
    return (
        <View className={classnames('w-screen', 'h-screen')}>
            <Button className="btn btn-active">Default</Button>
            <Button className="btn btn-active btn-neutral">Neutral</Button>
            <Button className="btn btn-active btn-primary">Primary</Button>
            <Button className="btn btn-active btn-secondary">Secondary</Button>
            <Button className="btn btn-active btn-accent">Accent</Button>
            <Button className="btn btn-active btn-ghost">Ghost</Button>
            <Button className="btn btn-active btn-link">Link</Button>
        </View>
    )
}

export default Index

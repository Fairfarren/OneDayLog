import { Input, View } from '@tarojs/components'
import classnames from 'classnames'

interface DiyFormProps {
    options: []
}

function DiyForm(props: DiyFormProps) {
    return (
        <View>
            {props.options.map((option, index) => (
                <View
                    key={index}
                    className={classnames(
                        'flex',
                        'items-center',
                        'box-border',
                        'w-full',
                        'border-0',
                        'border-b-[1px]',
                        'border-border-color',
                        'gap-1',
                    )}
                >
                    <View>{option.title}</View>
                    <View>
                        {option.render || (
                            <Input placeholder={`请输入${option.title}`} />
                        )}
                    </View>
                </View>
            ))}
        </View>
    )
}

export default DiyForm

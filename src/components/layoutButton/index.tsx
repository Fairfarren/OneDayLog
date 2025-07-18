import { DiyButton, type DiyButtonProps } from '@taro-react-tools/components'
import { Image, Text } from '@tarojs/components'
import classnames from 'classnames'
import Style from './index.module.scss'

interface DefaultButtonProps extends DiyButtonProps {
    title: string
    img?: string
}

export function ButtonDefault(
    props: DefaultButtonProps & {
        borderColor?: string
        textColor?: string
    },
) {
    return (
        <DiyButton
            {...props}
            className={classnames(
                '!text-[28px]',
                'rounded-md',
                'gap-1',
                'bg-white',
                'border-[2px]',
                'border-solid',
                '!px-2',
                '!py-[4px]',
                'h-[54px]',
                props.borderColor || 'text-border-color',
                props.className,
            )}
        >
            <Text
                className={classnames(props.textColor || 'text-border-color')}
            >
                {props.title}
            </Text>
            {props.img ? (
                <Image
                    src={props.img}
                    className={classnames('w-[26px]', 'h-[26px]')}
                />
            ) : (
                <></>
            )}
        </DiyButton>
    )
}

export function ButtonBlue(props: DefaultButtonProps) {
    return (
        <ButtonDefault
            {...props}
            borderColor="border-blue"
            textColor="text-blue"
        />
    )
}

export function ButtonGreen(props: DefaultButtonProps) {
    return (
        <ButtonDefault
            {...props}
            borderColor="border-none"
            textColor="text-green"
        />
    )
}

export function ButtonYellow(props: DefaultButtonProps) {
    return (
        <ButtonDefault
            {...props}
            className={classnames(Style['button-yellow'], props.className)}
            borderColor="border-none"
            textColor="text-white"
        />
    )
}

export function ButtonClear(props: DiyButtonProps) {
    return (
        <DiyButton {...props} className={classnames('!p-0', props.className)} />
    )
}

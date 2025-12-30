import {useState} from "react";
import {Button, Flex, Input} from "antd";
import { PoweroffOutlined } from '@ant-design/icons';
import './PasswordGate.css'

const secret = 'Jeremy'
export const PasswordGate = ({ onNextStage }: { onNextStage: () => void }) => {
    const [value, setValue] = useState('');
    const isValidAnswer = value.toLowerCase().trim() === secret.toLowerCase().trim();

    return (
        <Flex className={'PasswordGateImage-Container'}>
            <div className={isValidAnswer ? 'PasswordGateImage PasswordGateImage-Open' : 'PasswordGateImage PasswordGateImage-Close'}/>
            <div className={'PasswordGateImage PasswordGateImage-Bug'}/>
            <Flex className={'PasswordGateGroup'}>
                <Input autoComplete='off' name='ans' placeholder="Введите пароль" className={'PasswordGateInput'} onChange={(e) => {
                    setValue(e.target.value)
                }}/>
                {
                    isValidAnswer &&
                    <Button size={'large'} icon={<PoweroffOutlined />} onClick={onNextStage}/>
                }
            </Flex>
        </Flex>
    )
}
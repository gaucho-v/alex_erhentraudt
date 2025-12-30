import React from 'react';
import {
    DatePicker,
    Form,
    Input,
    Flex,
    Card,
    Typography,
} from 'antd';
import './Feedback.css';
import {postData} from "../../utils/postData";

const TitleStyle = {
    margin: '0',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)',
    color: 'white',
}

export const Feedback = ({ onNextStage }: { onNextStage: () => void }) => {
    const [form] = Form.useForm();
    const variant = Form.useWatch('variant', form);

    const onFinish = async (values: any) => {
        postData("https://tools.tw1.su/api.php", {
            name: values.name,
            place: values.place,
            tg: values.tg,
            bdate: values.bdate,
            btime: values.btime,
            feed: values.feed,
        }).then(() => {
            onNextStage();
        });
    }

    return (
        <Flex className={'Question_Container'}>
            <Card className="Question_Container_Card Feedback_Container_Card" style={{ paddingTop: 0, width: '100%' }}>
                <Typography.Title level={1} style={{...TitleStyle, textAlign: 'center'}}>
                    Feedback
                </Typography.Title>

                <Form
                    requiredMark={false}
                    form={form}
                    onFinish={onFinish}
                    variant={variant || 'filled'}
                    size={'large'}
                    initialValues={{ variant: 'filled' }}
                >

                    <Form.Item label={<Typography.Title level={4} style={TitleStyle}>Имя</Typography.Title>} name="name" layout="vertical" rules={[{ required: true, message: 'Пожалуйста, введите Имя' }]}>
                        <Input placeholder={'Введите имя'} className={'Feedback_Container_Input'}/>
                    </Form.Item>

                    <Form.Item label={<Typography.Title level={4} style={TitleStyle}>Место рождения</Typography.Title>} name="place" layout="vertical" rules={[{ required: true, message: 'Пожалуйста, введите место своего рождения' }]}>
                        <Input placeholder={'Введите место'} className={'Feedback_Container_Input'}/>
                    </Form.Item>

                    <Form.Item
                        label={<Typography.Title level={4} style={TitleStyle}>Ваш username в ТГ</Typography.Title>}
                        name="tg"
                        layout="vertical"
                        rules={[{ required: true, message: 'Пожалуйста, введите TG username' }]}
                    >
                        <Input placeholder={'Введите TG username'} className={'Feedback_Container_Input'}/>
                    </Form.Item>

                    <Form.Item
                        label={<Typography.Title level={4} style={TitleStyle}>Дата рождения</Typography.Title>}
                        name="bdate"
                        layout="vertical"
                        rules={[{ required: true, message: 'Пожалуйста, введите дату своего рождения' }]}
                    >
                        <DatePicker placeholder={'Укажите дату'} format="DD/MM/YYYY" className={'Feedback_Container_Input'}/>
                    </Form.Item>

                    <Form.Item
                        label={<Typography.Title level={4} style={TitleStyle}>Время рождения</Typography.Title>}
                        name="btime"
                        layout="vertical"
                        rules={[{ required: true, message: 'Пожалуйста, введите время своего рождения' }]}
                    >
                        <Input placeholder={'Укажите время'} className={'Feedback_Container_Input'}/>
                    </Form.Item>

                    <Form.Item
                        label={<Typography.Title level={4} style={TitleStyle}>Пожелания здоровья автору</Typography.Title>}
                        name="feed"
                        layout="vertical"
                        rules={[{ required: true, message: 'Пожалуйста, введите что-то' }]}
                    >
                        <Input.TextArea placeholder={'Введите что-нибудь'} className={'Feedback_Container_Input'}/>
                    </Form.Item>

                    <Form.Item label={null}>
                        <button type={'submit'} style={{ marginTop: '16px', width: '100%' }} className={'reset-button'}>
                            <Typography.Title level={4} style={TitleStyle}>Загадать желание</Typography.Title>
                        </button>
                    </Form.Item>
                </Form>
            </Card>
        </Flex>
    )
}
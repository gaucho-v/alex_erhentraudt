import React from 'react';
import {
    Button,
    TimePicker,
    DatePicker,
    Form,
    Input,
    Flex,
    Card,
    Typography,
    InputNumber,
    Mentions,
    Segmented,
    Select,
    TreeSelect,
} from 'antd';
import './Feedback.css';
import {postData} from "../../utils/postData";

const formItemLayout = {

};


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
        }).then((data) => {
            console.log(data);
        });
    }

    return (
        <Flex className={'Question_Container'}>
            <Card className="Question_Container_Card Feedback_Container_Card" style={{ paddingTop: 0, width: '100%' }}>
                <Typography.Title level={2} style={{...TitleStyle, textAlign: 'center'}}>
                    Какой-то важный сбор данных
                </Typography.Title>

                <Form
                    {...formItemLayout}
                    form={form}
                    onFinish={onFinish}
                    variant={variant || 'filled'}
                    style={{ marginTop: '16px' }}
                    size={'large'}
                    initialValues={{ variant: 'filled' }}
                >

                    <Form.Item label={<Typography.Title level={4} style={TitleStyle}>Имя</Typography.Title>} name="name" layout="vertical" rules={[{ required: true, message: 'Пожалуйста, введите Имя' }]}>
                        <Input placeholder={'Введите имя'} />
                    </Form.Item>

                    <Form.Item label={<Typography.Title level={4} style={TitleStyle}>Место рождения</Typography.Title>} name="place" layout="vertical" rules={[{ required: true, message: 'Пожалуйста, введите место своего рождения' }]}>
                        <Input placeholder={'Введите место'}/>
                    </Form.Item>

                    <Form.Item
                        label={<Typography.Title level={4} style={TitleStyle}>Ваш username в ТГ</Typography.Title>}
                        name="tg"
                        layout="vertical"
                        rules={[{ required: true, message: 'Пожалуйста, введите TG username' }]}
                    >
                        <Input placeholder={'Введите TG username'}/>
                    </Form.Item>

                    <Form.Item
                        label={<Typography.Title level={4} style={TitleStyle}>Дата рождения</Typography.Title>}
                        name="bdate"
                        layout="vertical"
                        rules={[{ required: true, message: 'Пожалуйста, введите дату своего рождения' }]}
                    >
                        <DatePicker placeholder={'Укажите дату'} format="DD/MM/YYYY"/>
                    </Form.Item>

                    <Form.Item
                        label={<Typography.Title level={4} style={TitleStyle}>Время рождения</Typography.Title>}
                        name="btime"
                        layout="vertical"
                        rules={[{ required: true, message: 'Пожалуйста, введите время своего рождения' }]}
                    >
                        <Input placeholder={'Укажите время'}/>
                    </Form.Item>

                    <Form.Item
                        label={<Typography.Title level={4} style={TitleStyle}>Пожелания здоровья автору</Typography.Title>}
                        name="feed"
                        layout="vertical"
                        rules={[{ required: true, message: 'Пожалуйста, введите что-то' }]}
                    >
                        <Input.TextArea placeholder={'Введите что-нибудь'}/>
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit" style={{ marginTop: '16px', width: '100%' }}>
                            Загадать желание
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Flex>
    )
}
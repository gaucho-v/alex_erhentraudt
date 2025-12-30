import {Typography} from "antd";

import React from 'react';
import { Card, Row, Col, List, Space, Divider, Button } from 'antd';
import {
    StarFilled,
    GiftFilled,
    HeartFilled,
    SmileFilled,
    ThunderboltFilled,
    FireFilled
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

export const Congratulation = () => {
    const poem = [
        "Снегурочка-краса,",
        "Пришла волшебная пора!",
        "Пусть Дед Мороз в полночный час",
        "Исполнит всё, что пожелала ты сейчас.",
        "",
        "Пусть ёлку ярко озарят огни,",
        "И сказка в двери постучится.",
        "Под бой курантов загадай скорей,",
        "И пусть мечта твоя случится!"
    ];

    const wishes = [
        {
            icon: <StarFilled style={{ color: '#1890ff' }} />,
            title: "Волшебства и уюта",
            description: "Желаю, чтобы этот год был окутан атмосферой чудес, как тёплый плед, а в твоём сердце всегда жило ожидание праздника."
        },
        {
            icon: <GiftFilled style={{ color: '#ff4d4f' }} />,
            title: "Исполнения желаний",
            description: "Пусть сбудутся не только самые заветные мечты, но и реализуются маленькие, но важные цели — будь то новая интересная книга, умение или долгожданная встреча."
        },
        {
            icon: <SmileFilled style={{ color: '#faad14' }} />,
            title: "Вдохновения и радости",
            description: "Чтобы каждый день приносил что-то хорошее: интересную идею, красивый рассвет, вкусную печеньку или повод для звонкого, искреннего смеха."
        },
        {
            icon: <HeartFilled style={{ color: '#eb2f96' }} />,
            title: "Крепкой дружбы и любви",
            description: "Чтобы рядом всегда были люди, которые тебя понимают, поддерживают и дарят чувство, что ты не одна."
        },
        {
            icon: <ThunderboltFilled style={{ color: '#52c41a' }} />,
            title: "Здоровья и сил",
            description: "Чтобы энергии и бодрости хватало на все твои проекты, увлечения и приключения."
        }
    ];

    return (
        <div style={{
            padding: '20px',
        }}>
            <Row justify="center">
                <Col>
                    <Card
                        bordered={false}
                        style={{
                            marginTop: 24,
                            borderRadius: 20,
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                            background: 'white',
                            overflow: 'hidden'
                        }}
                        cover={
                            <div style={{
                                background: 'linear-gradient(90deg, #ff6b6b, #ffa726)',
                                padding: '40px 20px',
                                textAlign: 'center',
                                position: 'relative',
                                overflow: 'hidden',
                                width: 'initial',
                            }} className={'Question_Container_Card'}>
                                <Title level={2} style={{
                                    color: 'white',
                                    margin: 0,
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                                    fontWeight: 'bold',
                                }}>
                                    🎄 С Новым Годом, Саша! 🎄
                                </Title>
                            </div>
                        }
                    >
                        {/* Стих */}
                        <div style={{
                            padding: '32px 0',
                            textAlign: 'center',
                            background: 'linear-gradient(45deg, #fff9c4, #e1f5fe)',
                            borderRadius: 12,
                            marginBottom: 24
                        }}>
                            {poem.map((line, index) => (
                                <Paragraph
                                    key={index}
                                    style={{
                                        textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)',
                                        fontSize: line ? '1.2rem' : '1rem',
                                        margin: '8px 0',
                                        color: line ? '#1a237e' : 'transparent',
                                        fontWeight: 'normal',
                                        lineHeight: 1.8
                                    }}
                                >
                                    {line || <br />}
                                </Paragraph>
                            ))}
                        </div>

                        <Divider>
                            <FireFilled style={{ color: '#ff6b6b', marginRight: 8 }} />
                            <Text strong style={{ color: '#ff6b6b' }}>Пожелания к Новому году</Text>
                        </Divider>

                        {/* Список пожеланий */}
                        <List
                            dataSource={wishes}
                            renderItem={(item, index) => (
                                <List.Item style={{ padding: '16px 8px' }}>
                                    <Card
                                        hoverable
                                        style={{
                                            width: '100%',
                                            borderLeft: `4px solid ${item.icon.props.style.color}`,
                                            borderRadius: 12
                                        }}
                                    >
                                        <Space size="middle" align="start">
                                            <div style={{ fontSize: '24px' }}>
                                                {item.icon}
                                            </div>
                                            <div>
                                                <Title level={4} style={{ marginBottom: 8, color: '#1a237e' }}>
                                                    {item.title}
                                                </Title>
                                                <Paragraph style={{
                                                    color: '#546e7a',
                                                    margin: 0,
                                                    fontSize: '1rem'
                                                }}>
                                                    {item.description}
                                                </Paragraph>
                                            </div>
                                        </Space>
                                    </Card>
                                </List.Item>
                            )}
                        />

                        {/* Подпись */}
                        <div style={{
                            textAlign: 'center',
                            marginTop: 32,
                            padding: '16px',
                            borderTop: '1px dashed #e0e0e0'
                        }}>
                            <Text type="secondary">
                                С любовью и наилучшими пожеланиями в {new Date().getFullYear()} году
                            </Text>
                            <div>
                                <Text type="secondary">
                                    На этом QUIZ No Soju No Chill заканчивается...
                                </Text>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
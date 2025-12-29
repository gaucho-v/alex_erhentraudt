import {Row, Flex, Card, Col, Typography} from "antd";
import './Answers.css';
import { useState } from "react";
import {AnswerType} from "../../models/models";

type AnswersProps = AnswerType & {
    onClick: () => void,
}
export const Answers = ({ id, options, onClick }: AnswersProps) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleAnswerClick = (index: any) => {
        setSelectedAnswer(index);
        setIsSubmitted(true)
        setTimeout(() => {
            onClick();
            setSelectedAnswer(null);
            setIsSubmitted(false)
        }, 1000)
    };

    return (
        <Flex className={'Answers_Container'}>
            <Row gutter={[16, 16]} justify="center">
                {options.map((answer, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = answer.isCorrect;
                    let cardStyle = {};

                    if (isSubmitted) {
                        if (isCorrect) {
                            cardStyle = {
                                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                                transform: 'scale(1.02)',
                                boxShadow: '0 8px 25px rgba(67, 233, 123, 0.3)'
                            };
                        } else if (isSelected && !isCorrect) {
                            cardStyle = {
                                background: 'linear-gradient(135deg, #ff6b6b 0%, #ffa8a8 100%)',
                                opacity: 0.8
                            };
                        }
                    } else if (isSelected) {
                        cardStyle = {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
                        };
                    }

                    const getCurrentClassByIndex = () => {
                        switch (index) {
                            case 0:
                                return 'answer-card-a';
                            case 1:
                                return 'answer-card-b';
                            case 2:
                                return 'answer-card-c';
                            case 3:
                                return 'answer-card-d';
                        }
                    }

                    const classNameByIndex = getCurrentClassByIndex();

                    return (
                        <Col xs={24} sm={12} lg={12} key={index}>
                            <Card
                                className={classNameByIndex}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: answer.image ? '100%' : '126px',
                                    border: 'none',
                                    cursor: !isSubmitted ? 'pointer' : 'default',
                                    transition: 'all 0.3s ease',
                                    ...cardStyle
                                }}
                                onClick={() => handleAnswerClick(index)}
                                hoverable={!isSubmitted}
                            >
                                <div className="Answer-Content">
                                    {
                                        answer.label &&
                                        <Typography.Text className={'Answer_Card_Text'} strong>
                                            {answer.label}
                                        </Typography.Text>
                                    }
                                    {
                                        answer.image &&
                                        <div style={{
                                            backgroundImage: `url(${answer.image})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover',
                                            height: '240px',
                                            width: '240px',
                                        }}/>
                                    }
                                </div>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </Flex>
    )
}
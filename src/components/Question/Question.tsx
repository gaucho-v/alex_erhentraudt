import {QuestionType} from "../../models/models";
import {Flex, Card, Space, Typography, Button} from "antd";
import './Question.css';
import ImageScratchCanvas from "../ImageScratchCanvas/ImageScratchCanvas";
import {YoutubeFrame} from "../YoutubeFrame/YoutubeFrame";
const { Title, Text } = Typography;

type QuestionProps = {
    onBack: () => void;
    questionsCount: number;
}
export const Question = ({ title, id, imageClassName, onBack, questionsCount, label, link }: QuestionType & QuestionProps) => {
    return (
        <Flex className={'Question_Container'}>
            <Card className="Question_Container_Card" style={{ paddingTop: 0 }}>
                <div className="question-content">
                    <Button type={'text'} onClick={onBack} style={{ color: 'white', margin: 0, textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)', fontSize: '24px', padding: 0, paddingBottom: '16px' }}>Назад</Button>
                    <Space size="middle" style={{ width: '100%' }} orientation={'vertical'}>
                        <div className="Question_Header">
                            <Title level={2} className='Question_Container_Card_Text' style={{ textAlign: 'left' }}>
                                {label}
                            </Title>
                            <Text className='Question_Container_Card_Text' strong style={{ color: 'white', textAlign: 'right' }}>{`${id} из ${questionsCount}`}</Text>
                        </div>

                        {
                            id === 7 && <ImageScratchCanvas/>
                        }

                        {
                            link && <YoutubeFrame link={link}/>
                        }

                        {
                            imageClassName &&
                            <div className={`Question_Image ${imageClassName}`}/>
                        }

                        {
                            title &&
                            <Title className='Question_Container_Card_Text' level={3} style={{ color: 'white', margin: 0 }}>
                                {title}
                            </Title>
                        }

                        <div className="question-hint">
                            <Text className='Question_Container_Card_Text'>
                                Выберите один правильный ответ из предложенных вариантов:
                            </Text>
                        </div>
                    </Space>
                </div>
            </Card>
        </Flex>
    )
}
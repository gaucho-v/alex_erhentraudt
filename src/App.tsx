import React, {useState} from 'react';
import { Layout } from "./components/Layout/Layout";
import {MainTitle} from "./components/MainTitle/MainTitle";
import {QuizGame} from "./components/QuizGame";
import {PasswordGate} from "./components/PasswordGate/PasswordGate";
import { Snowfall } from "./components/Snowfall/Snowfall";
import {Feedback} from "./components/Feedback/Feedback";
import {Congratulation} from "./components/Congratulation/Congratulation";
import { useStore } from './store/useStore'

type StagesType = 'gate' | 'quiz' | 'feedback' | 'congratulation';
export const App = () => {
  const [stage, setStage] = useState<StagesType>('gate');
  const { ansList, addAnswer } = useStore();

  const onNextStage = () => {
      window.scrollTo({
          top: 0,
      })

      switch (stage) {
          case 'gate':
              setStage('quiz')
              break;
          case 'quiz':
              setStage('feedback')
              break;
          case 'feedback':
              setStage('congratulation')
              break;
          default:
              return;
      }
  }

  const Page = {
      'gate': <PasswordGate onNextStage={onNextStage}/>,
      'quiz': <QuizGame onNextStage={onNextStage} addAnswer={addAnswer}/>,
      'feedback': <Feedback onNextStage={onNextStage} ansList={ansList}/>,
      'congratulation': <Congratulation/>
  }


  return (
      <>
          <Snowfall/>
          <Layout>
              <MainTitle/>
              {Page[stage]}
          </Layout>
      </>
  );
}

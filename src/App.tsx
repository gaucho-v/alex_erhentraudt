import React, {useState} from 'react';
import { Layout } from "./components/Layout/Layout";
import {MainTitle} from "./components/MainTitle/MainTitle";
import {QuizGame} from "./components/QuizGame";
import {PasswordGate} from "./components/PasswordGate/PasswordGate";
import { Snowfall } from "./components/Snowfall/Snowfall";
import {Feedback} from "./components/Feedback/Feedback";
import {Congratulation} from "./components/Congratulation/Congratulation";

type StagesType = 'gate' | 'quiz' | 'feedback' | 'congratulation';
export const App = () => {
  const [stage, setStage] = useState<StagesType>('gate');

  const onNextStage = () => {
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
      'quiz': <QuizGame onNextStage={onNextStage}/>,
      'feedback': <Feedback onNextStage={onNextStage}/>,
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

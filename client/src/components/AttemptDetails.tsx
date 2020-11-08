import { Descriptions, Divider, Space, Tag } from 'antd';
import React from 'react';
import { GetAttempt_institution_test_attempt } from '../types/generated/GetAttempt';
import { AnswerResult } from './AnswerResult';

interface AttemptDetailsProps {
  attempt: GetAttempt_institution_test_attempt;
}

export const AttemptDetails: React.FC<AttemptDetailsProps> = ({ attempt }) => {
  return (
    <div>
      <Divider>Attempt Information</Divider>

      <Descriptions layout="vertical">
        <Descriptions.Item label="Date Attempted">
          <Tag color="blue">{new Date(attempt.datetime).toDateString()}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Test Name">
          <Tag color="blue">{attempt.test.name}</Tag>
        </Descriptions.Item>
      </Descriptions>

      <Divider>Attempt Results</Divider>

      <Space direction="vertical">
        {attempt.answers.map((a) => (
          <AnswerResult
            key={a.id}
            label={a.question.label}
            answer={a.answer}
            officialAnswer={a.question.officialAnswer}
          />
        ))}
      </Space>
    </div>
  );
};

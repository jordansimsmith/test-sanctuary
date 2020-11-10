import { Card, Descriptions, Typography } from 'antd';

interface AnswerResultProps {
  label: string;
  answer: string;
  officialAnswer?: string;
  communityAnswer: {
    answer: string;
    count: number;
    total: number;
  };
}

export const AnswerResult: React.FC<AnswerResultProps> = ({
  label,
  answer,
  officialAnswer,
  communityAnswer,
}) => {
  let className: string;

  if (answer === officialAnswer) {
    className = 'correct-answer';
  }

  if (officialAnswer && answer !== officialAnswer) {
    className = 'incorrect-answer';
  }

  return (
    <Card title={`Question: ${label}`} className={className} size="small">
      <Descriptions layout="vertical">
        <Descriptions.Item label="Your Answer">
          <Typography.Text strong>{answer}</Typography.Text>
        </Descriptions.Item>

        <Descriptions.Item label="Official Answer">
          <Typography.Text strong={!!officialAnswer}>
            {officialAnswer || 'No offical answer available at this time'}
          </Typography.Text>
        </Descriptions.Item>

        <Descriptions.Item label="Community Answer">
          <Typography.Text strong>{communityAnswer.answer} </Typography.Text>
          is the most popular answer, with {communityAnswer.count}/
          {communityAnswer.total} votes.
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

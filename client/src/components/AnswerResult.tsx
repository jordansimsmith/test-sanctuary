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

  const cardTitle = (
    <Typography.Text>
      Question: <Typography.Text strong>{label}</Typography.Text>
    </Typography.Text>
  );

  return (
    <Card title={cardTitle} className={className} size="small">
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

import { Card, Descriptions } from 'antd';

interface AnswerResultProps {
  label: string;
  answer: string;
  officialAnswer?: string;
}

export const AnswerResult: React.FC<AnswerResultProps> = ({
  label,
  answer,
  officialAnswer,
}) => {
  let className: string;

  if (answer === officialAnswer) {
    className = 'correct-answer';
  }

  if (officialAnswer && answer !== officialAnswer) {
    className = 'incorrect-answer';
  }

  return (
    <Card title={`Question: ${label}`} className={className}>
      <Descriptions>
        <Descriptions.Item label="Your Answer">{answer}</Descriptions.Item>
        <Descriptions.Item label="Official Answer">
          {officialAnswer || 'No offical answer available at this time'}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

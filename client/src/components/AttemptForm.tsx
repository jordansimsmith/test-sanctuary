import { Button, Form, Input, Space } from 'antd';
import { GetTestAndQuestions_institution_test } from '../types/generated/GetTestAndQuestions';

interface AttemptFormProps {
  test: GetTestAndQuestions_institution_test;
  onFinish(values: any): void;
  loading?: boolean;
}

export const AttemptForm: React.FC<AttemptFormProps> = ({
  test,
  onFinish,
  loading,
}) => {
  const initialValues = {
    testId: +test.id,
    name: `Attempt: ${test.name}`,
    answers: test.questions.map((q) => ({
      questionId: +q.id,
      answer: '',
      label: q.label,
    })),
  };

  const transformValuesAndFinish = (values) => {
    // label just used for form display
    // remove it before sending
    const answers = values.answers.map((a) => ({ ...a, label: undefined }));
    onFinish({ ...values, answers });
  };

  return (
    <Form
      initialValues={initialValues}
      onFinish={transformValuesAndFinish}
      labelCol={{ span: 4 }}
    >
      <Form.Item label="Test" name="testId" rules={[{ required: true }]}>
        <Input disabled />
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        rules={[
          { required: true, message: 'Please input a valid attempt name' },
        ]}
      >
        <Input placeholder="Attempt: COMPSCI 711 2018 S2" />
      </Form.Item>

      <Form.List name="answers">
        {(fields) => (
          <>
            {fields.map((field) => (
              <Space
                key={field.key}
                align="baseline"
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Form.Item
                  {...field}
                  key={field.key}
                  name={[field.name, 'label']}
                  fieldKey={[field.fieldKey, 'label']}
                  label="Question"
                  labelCol={{}}
                >
                  <Input disabled />
                </Form.Item>

                <Form.Item
                  {...field}
                  key={field.key}
                  name={[field.name, 'answer']}
                  fieldKey={[field.fieldKey, 'answer']}
                  label="Answer"
                  labelCol={{}}
                  rules={[
                    {
                      required: true,
                      message: 'Please input a valid answer',
                    },
                  ]}
                >
                  <Input placeholder="a" />
                </Form.Item>
              </Space>
            ))}
          </>
        )}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

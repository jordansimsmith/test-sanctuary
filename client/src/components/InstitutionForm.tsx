import { Button, Divider, Form, Input } from 'antd';
import React from 'react';

interface InstitutionFormProps {
  onFinish(values: any): void;
  loading?: boolean;
}

export const InstitutionForm: React.FC<InstitutionFormProps> = ({
  onFinish,
  loading,
}) => {
  const initialValues = {
    id: '',
    displayName: '',
  };

  return (
    <Form
      initialValues={initialValues}
      onFinish={onFinish}
      labelCol={{ span: 4 }}
    >
      <Divider>Institution Information</Divider>

      <Form.Item
        label="Identifier/URL"
        name="id"
        rules={[
          {
            required: true,
            min: 3,
            pattern: /^[a-zA-Z0-9]+[a-zA-Z0-9-_]+[a-zA-Z0-9]+$/,
            message:
              'Please enter a valid institution id of minimum length 3 that contains only alphanumeric characters with dashes or underscores separating them.',
          },
        ]}
      >
        <Input placeholder="universityofauckland" />
      </Form.Item>

      <Form.Item
        label="Display Name"
        name="displayName"
        rules={[
          {
            required: true,
            message: 'Please enter a valid institution display name',
          },
        ]}
      >
        <Input placeholder="The University of Auckland" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

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
          { required: true, message: 'Please enter a valid institution url' },
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

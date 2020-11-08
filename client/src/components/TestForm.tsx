import { Button, Divider, Form, Input, InputNumber, Space, Upload } from 'antd';
import { useRouter } from 'next/dist/client/router';
import {
  MinusCircleOutlined,
  PlusOutlined,
  InboxOutlined,
} from '@ant-design/icons';

interface TestFormProps {
  onFinish(values: any): void;
  loading?: boolean;
}

// adapter between upload component and form component
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }

  if (!e) {
    return e;
  }

  if (e.fileList.length > 1) {
    e.fileList.shift();
  }

  return e.fileList;
};

export const TestForm: React.FC<TestFormProps> = ({ onFinish, loading }) => {
  const router = useRouter();

  const initialValues = {
    institutionId: router.query.institution,
    name: '',
    subject: '',
    code: undefined,
    year: undefined,
    questions: [],
    testFile: undefined,
  };

  const transformValuesAndFinish = (values) => {
    onFinish({ ...values, testFile: values.testFile[0]?.originFileObj });
  };

  return (
    <Form
      initialValues={initialValues}
      onFinish={transformValuesAndFinish}
      labelCol={{ span: 4 }}
    >
      <Divider>Test Information</Divider>

      <Form.Item
        label="Institution"
        name="institutionId"
        rules={[{ required: true }]}
      >
        <Input disabled />
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input a test name' }]}
      >
        <Input placeholder="COMPSCI 711 2018 Test 2" />
      </Form.Item>

      <Form.Item
        label="Subject"
        name="subject"
        rules={[{ required: true, message: 'Please input a subject' }]}
      >
        <Input placeholder="COMPSCI" />
      </Form.Item>

      <Form.Item
        label="Code"
        name="code"
        rules={[
          {
            required: true,
            type: 'number',
            message: 'Please input a valid integer code',
          },
        ]}
        className="input-number-block"
      >
        <InputNumber placeholder="711" />
      </Form.Item>

      <Form.Item
        label="Year"
        name="year"
        rules={[
          {
            required: true,
            type: 'number',
            message: 'Please input a valid year',
          },
        ]}
        className="input-number-block"
      >
        <InputNumber placeholder="2018" />
      </Form.Item>

      <Form.Item
        label="Questions Upload"
        name="testFile"
        rules={[
          { required: true, message: 'Please select a valid questions file' },
        ]}
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload.Dragger accept=".pdf">
          <InboxOutlined />
          <p>Upload</p>
        </Upload.Dragger>
      </Form.Item>

      <Divider>Questions</Divider>

      <Form.List name="questions">
        {(fields, { add, remove }) => (
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
                  label="Label"
                  labelCol={{}}
                  rules={[
                    {
                      required: true,
                      message: 'Please input a valid question label',
                    },
                  ]}
                >
                  <Input placeholder="3a" />
                </Form.Item>

                <Form.Item
                  {...field}
                  key={field.key}
                  name={[field.name, 'officialAnswer']}
                  fieldKey={[field.fieldKey, 'officialAnswer']}
                  label="Answer"
                  labelCol={{}}
                >
                  <Input placeholder="d (optional)" />
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}

            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add question
              </Button>
            </Form.Item>
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

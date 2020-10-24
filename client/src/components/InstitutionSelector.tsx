import { useQuery } from '@apollo/client';
import { AutoComplete, Input, Spin, Alert } from 'antd';
import { useRouter } from 'next/dist/client/router';
import { useMemo } from 'react';
import { GET_INSTITUTIONS } from '../lib/graphql/institutions';
import { GetInstitutions } from '../types/generated/GetInstitutions';

interface InstitutionSelectorProps {}

export const InstitutionSelector: React.FC<InstitutionSelectorProps> = () => {
  const { data, loading, error } = useQuery<GetInstitutions>(GET_INSTITUTIONS);

  const options = useMemo(
    () => data && data.institutions.map((i) => ({ value: i.id })),
    [data?.institutions],
  );

  const router = useRouter();

  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <Alert message="Could not load institutions" type="error" />;
  }

  return (
    <AutoComplete
      options={options}
      onSelect={(value) => router.push(`/institutions/${value}`)}
      filterOption
      defaultValue={router.query.institution as string}
    >
      <Input.Search placeholder="Select Institution" />
    </AutoComplete>
  );
};

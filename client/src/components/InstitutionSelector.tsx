import { useQuery } from '@apollo/client';
import { AutoComplete, Input, Alert } from 'antd';
import { useRouter } from 'next/dist/client/router';
import { useMemo } from 'react';
import { GET_INSTITUTIONS } from '../lib/graphql/institutions';
import { GetInstitutions } from '../types/generated/GetInstitutions';

interface InstitutionSelectorProps {}

export const InstitutionSelector: React.FC<InstitutionSelectorProps> = () => {
  const { data, error } = useQuery<GetInstitutions>(GET_INSTITUTIONS);

  const options = useMemo(
    () => data && data.institutions.map((i) => ({ value: i.id })),
    [data?.institutions],
  );

  const router = useRouter();

  if (error) {
    return <Alert message="Could not load institutions" type="error" />;
  }

  return (
    <AutoComplete
      options={options}
      onSelect={(value) => router.push(`/institutions/${value}`)}
      filterOption
      defaultValue={router.query.institution as string}
      className="autocomplete-block"
    >
      <Input.Search placeholder="Select Institution" allowClear />
    </AutoComplete>
  );
};

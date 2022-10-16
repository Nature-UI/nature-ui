import { Badge, Stack } from '../src';

export default {
  title: 'Badge',
};

export const Default = () => <Badge className='bg-gray-200'>default</Badge>;

export const WithColor = () => {
  return (
    <Stack spacing={'2rem'} row>
      <Badge className='bg-green-600 text-green-100'>default</Badge>
      <Badge className='bg-green-200 text-green-600'>default</Badge>
      <Badge className='bg-green-500 text-green-100'>default</Badge>
    </Stack>
  );
};

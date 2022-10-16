import { Divider, Stack } from '../src';

export default {
  title: 'Divider',
};

export const Vertical = () => {
  return (
    <div className='px-12 h-16'>
      <Divider orientation='vertical' />
    </div>
  );
};

export const Horizontal = () => {
  return (
    <Stack col>
      <span>Part 1</span>
      <Divider color='red-500' />
      <span>Part 2</span>
    </Stack>
  );
};

export const Default = () => <Divider />;

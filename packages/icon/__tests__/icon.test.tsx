import { testA11y } from '@nature-ui/test-utils';
import { Md3DRotation } from 'react-icons/md';
import { Icon } from '../src';

describe('@nature-ui/icon', () => {
  it('passes a11y test', async () => {
    await testA11y(<Icon />);
  });

  it('passes a11y test given a third-party icon', async () => {
    await testA11y(<Icon as={Md3DRotation} />);
  });
});

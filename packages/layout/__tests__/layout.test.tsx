import { render, testA11y } from '@nature-ui/test-utils';
import { Badge, Box } from '../src';

describe('@nature-ui/layout', () => {
  describe('Box', () => {
    test('passes a11y test', async () => {
      await testA11y(<Box>this is a box</Box>);
    });
    test('as - prop works correctly', () => {
      const { getByText } = render(
        <Box as='a' href='www.google.com'>
          Box
        </Box>,
      );
      expect(getByText('Box').nodeName).toBe('A');
      expect(getByText('Box')).toHaveAttribute('href');
    });
  });

  describe('Badge', () => {
    test('passes a11y test', async () => {
      await testA11y(<Badge>this is a badge</Badge>);
    });
  });
});

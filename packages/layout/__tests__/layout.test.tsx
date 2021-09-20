import { render } from '@nature-ui/test-utils';
import { Badge, Box } from '../src';

describe('@nature-ui/layout', () => {
  describe('Box', () => {
    test('should render box correctly', () => {
      const tools = render(<Box>This is box</Box>);

      expect(tools.asFragment()).toMatchSnapshot();
    });

    test('as - prop works correctly', () => {
      const tools = render(
        <Box as='a' href='www.google.com'>
          This is box
        </Box>,
      );

      expect(tools.asFragment()).toMatchSnapshot();
    });
  });

  describe('Badge', () => {
    test('should render with default theming', () => {
      const tools = render(<Badge>Badge</Badge>);

      expect(tools.asFragment()).toMatchSnapshot();
    });

    test('override the theming props', () => {
      const tools = render(
        <Badge variant='outline' color='pink-500'>
          Badge
        </Badge>,
      );

      expect(tools.asFragment()).toMatchSnapshot();
    });
  });
});

/** ** */
import { render } from '@nature-ui/test-utils';
import * as React from 'react';

import { nature } from '../src';

describe('@nature-ui/system', () => {
  test('as jsx element', () => {
    const Div = nature('div');
    const tools = render(<Div as='span'>a</Div>);

    expect(tools.getByText('a')).toMatchInlineSnapshot(`
    <span>
      a
    </span>
  `);
  });

  test('as component', () => {
    type Props = {
      isBig?: boolean;
    };

    const Toyota = ({ isBig, ...props }: Props) => (
      <div data-size={isBig ? 'big' : 'small'} {...props} />
    );

    const Div = nature('div');

    const tools = render(
      <Div as={Toyota} isBig>
        a
      </Div>,
    );

    expect(tools.getByText('a')).toMatchInlineSnapshot(`
     <div
       data-size="big"
     >
       a
     </div>
     `);
  });

  test('nature elements - renders with tailwind className props', () => {
    const tools = render(<nature.div className='mt-40'>Welcome</nature.div>);

    expect(tools.asFragment()).toMatchSnapshot();

    expect(tools.getByText('Welcome')).toHaveClass('mt-40');
  });

  test('nature function - renders correctly', () => {
    const Button = nature('button');
    const tools = render(<Button>Click Me</Button>);

    expect(tools.getByText('Click Me')).toMatchInlineSnapshot(`
      <button>
        Click Me
      </button>
    `);
  });

  test('it allows pass through props', () => {
    const Image = nature('img');
    const tools = render(<Image data-testid='img' width='60px' />);

    expect(tools.asFragment()).toMatchSnapshot();
  });
});

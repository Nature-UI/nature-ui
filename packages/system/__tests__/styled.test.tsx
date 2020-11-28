/** @jsx jsx */
import { render } from '@nature-ui/test-utils';

import { nature, jsx } from '../src';

describe('@nature-ui/system', () => {
  test('as jsx element', () => {
    const Div = nature('div');
    const tools = render(<Div as='span'>a</Div>);

    expect(tools.getByAltText('a')).toMatchInlineSnapshot(`
    <span>
    a
    </span>
    `);
  });
});

/** ** */
import * as React from 'react';

import { render } from '../src';

test('as jsx element', () => {
  const tools = render(<span>a</span>);

  expect(tools.getByText('a')).toMatchInlineSnapshot(`
    <span>
      a
    </span>
  `);
});

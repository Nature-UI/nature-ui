import { render } from '@nature-ui/test-utils';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '../src';

describe('@nature-ui/breadcrumb', () => {
  test('has the proper aria-attributes', () => {
    const { getByText, getAllByRole, getByLabelText } = render(
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href='#'>Link 1</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href='#'>Link 2</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrent>
          <BreadcrumbLink>Link 3</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>,
    );

    // surrounding `nav` has aria-label="breadcrumb"
    getByLabelText('breadcrumb', { selector: 'nav' });

    // `isCurrentPage` link has aria-current="page"
    const currentPageLink = getByText('Link 3');

    expect(currentPageLink).toHaveAttribute('aria-current', 'page');

    // separator receives presentation="role"
    expect(getAllByRole('presentation')).toHaveLength(2);
  });

  test('seperator can be changed', () => {
    const { getAllByText } = render(
      <Breadcrumb separator='-'>
        <BreadcrumbItem>
          <BreadcrumbLink href='#'>Link 1</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href='#'>Link 2</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>,
    );

    expect(getAllByText('-')).toHaveLength(1);
  });
});

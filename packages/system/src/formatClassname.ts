export const formatClassNames = (className: string): string => {
  const withCss = className.split(' ').filter((v) => v.match(/css-\w+/));
  const ArrayClassName = className
    .split(' ')
    .filter((v) => !v.match(/css-\w+/));

  const result = {};
  const required: string[] = [];
  ArrayClassName.forEach((v) => {
    const splitCn = v.split('-');

    if (splitCn.length === 1) {
      required.push(v);
    } else if (isNaN(parseInt(splitCn[1]))) {
      required.push(v);
    } else {
      const firstChar = splitCn[0];
      result[firstChar] = v;
    }
  });

  const cn = `${Object.values(result).join(' ')} ${required.join(
    ' ',
  )} ${withCss?.join(' ')}`;

  return cn;
};

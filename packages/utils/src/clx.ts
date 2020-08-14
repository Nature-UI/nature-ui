type Other = string | number | null | boolean | undefined;
type ClassValue = ClassArray | Partial<ClassDict> | Other;

interface ClassDict {
  [key: string]: Other;
}
type ClassArray = Array<ClassValue>;

export const clx = (...classNames: ClassValue[]): string => {
  const c = classNames.filter(Boolean);

  console.log(c);

  return c.join(' ');
};

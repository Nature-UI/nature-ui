type Other = string | number | null | boolean | undefined;
type ClassValue = ClassArray | ClassDict | Other;

interface ClassDict {
  [key: string]: Other;
}
type ClassArray = Array<ClassValue>;

export const clx = (...classNames: ClassValue[]): string => classNames.filter(Boolean).join(' ');

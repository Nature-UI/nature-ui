type Other = string | number | null | boolean | undefined;
export type ClassValue = ClassArray | ClassDict | Other;

interface ClassDict {
  [key: string]: Other;
}
export type ClassArray = Array<ClassValue>;

const clx = (...classNames: ClassValue[]): string => classNames.filter(Boolean).join(' ');

export default clx;

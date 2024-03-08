export interface IFile {
  name: string;
  path: string;
  children: IFile[] | null;
}

export interface File {
  id: number;
  name: string;
  description:string;
  tags: string[];
  importance: number;
  access: string;
  fileType: string;
  createdAt: Date;
}
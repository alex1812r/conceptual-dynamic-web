export type BaseEntityType = {
  id: number
  createdAt: string;
  updatedAt: string;
}

export type FileType = BaseEntityType & {
  fileId: string;
  filename: string;
  url: string;
}

export type FileInputType = {
  fileId: string;
  filename: string;
  url: string;
}

export type BaseFilterType = {
  q?: string;
  page?: number
  perPage?: number;
}
export type ClashFormType = {
  title?: string;
  description?: string;
};
export type ClashFormTypeError = {
  title?: string;
  description?: string;
  expire_At?: string;
  image?: string;
};

export type ClashFetchData = {
  id: number;
  user_id: number;
  title: string;
  description: string;
  image: string;
  created_At: string;
  expire_At: string;
  ClashItem: Array<ClashItems>;
  ClashComments: Array<ClashComments>;
};

export type ClashItemForm = {
  image: File | null;
};

export type ClashItems = {
  id: number;
  count: number;
  image: string;
};
export type ClashComments = {
  id: number;
  comment: number;
  created_At: string;
};

export interface AuthMe {
  email: string;
  name: string;
  role: number;
}

export interface FetchPoNames {
  status: "success";
  data: { poNumber: string; uuid: string }[];
}

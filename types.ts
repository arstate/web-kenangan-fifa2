export interface User {
  name: string;
  email: string;
  avatarUrl: string;
}

export interface Memory {
  id: string;
  title: string;
  date: string;
  story: string;
  imageUrls: string[];
}

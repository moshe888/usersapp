import create from "./http-service";

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }


export default create('/posts');
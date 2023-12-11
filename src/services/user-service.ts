import create from "./http-service";

export interface User {
    id: number;
    name: string;
    email: string;
    username: string;
  }


export default create('/users');
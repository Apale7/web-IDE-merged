export interface routeInfo {
  path: string;
  exact?: boolean | undefined;
  component: any;
  auth?: string[];
}

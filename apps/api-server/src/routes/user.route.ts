import RouteInterface from "./interface.route";
import { Method, Route } from "../types";

class UserRoute extends RouteInterface {
  constructor() {
    const routes: Route[] = [
      {
        path: "/signup",
        method: Method.POST,
        functions: [(req: Request, res: Response) => {}],
      },
      {
        path: "/signup",
        method: Method.POST,
        functions: [(req: Request, res: Response) => {}],
      },
    ];
    super(routes);
  }
}

export default UserRoute;

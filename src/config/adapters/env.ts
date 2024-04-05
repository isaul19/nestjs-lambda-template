import { get } from 'env-var';

export class Env {
  public static get SERVER_PORT() {
    return get('SERVER_PORT').required().asPortNumber();
  }
}

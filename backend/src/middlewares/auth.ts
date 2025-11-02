import { userRepo } from "../repositories/userRepo";
import { NextFunction, Request, Response } from 'express';

export const checkPermissionsMiddleware = ({
  apiPermissions,
}: {
  apiPermissions: string[];
}) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dev = false;
    if (dev) {
      return;
    }
    const { email } = req.decodedAccessToken;
    const user = await userRepo.findByEmail(email);
    if (!user) {
      console.error('Failed to get user', user);
      return;
    }
    for (const apiPermission of apiPermissions) {
      if (user.role.includes(apiPermission)) {
        return;
      }
    }
  };
};

import { Router } from 'express';
import userRoute from './user.routes';
import productRoute from './products.routes'
import authRoute from './auth.route'
import { routeGuard } from '../middlewares/routeGuard';
import memberRoute from './member.route'
export const privateRouter = Router();
export const publicRouter = Router();

privateRouter.use('/users', userRoute);
publicRouter.use('/member', memberRoute);
privateRouter.use('/products', routeGuard('admin'), productRoute)
publicRouter.use('/auth', authRoute)

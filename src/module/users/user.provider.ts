import { Users } from '../../entity/user.entity';

export const usersProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: Users,
  },
];

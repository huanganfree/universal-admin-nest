import { SetMetadata } from '@nestjs/common';

export const NO_JWT = 'noJwt';
export const NoJwtDeco = () => SetMetadata(NO_JWT, true);

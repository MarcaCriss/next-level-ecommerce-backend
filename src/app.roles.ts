import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  USUARIO = 'USUARIO',
  ADMIN = 'ADMIN',
}

export enum AppResource {
  USER = 'USER',
  PRODUCT = 'PRODUCT',
  CATEGORY = 'CATEGORY',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  // USUARIO ROLES
  .grant(AppRoles.USUARIO)
  .updateOwn(AppResource.USER)
  .deleteOwn(AppResource.USER)
  /*
  .createOwn([AppResource.PRODUCT])
  .updateOwn([AppResource.PRODUCT])
  .deleteOwn([AppResource.PRODUCT])
  */
  // ADMIN ROLES
  .grant(AppRoles.ADMIN)
  .extend(AppRoles.USUARIO)
  .createAny([AppResource.USER, AppResource.PRODUCT, AppResource.CATEGORY])
  .updateAny([AppResource.USER, AppResource.PRODUCT, AppResource.CATEGORY])
  .deleteAny([AppResource.USER, AppResource.PRODUCT, AppResource.CATEGORY]);

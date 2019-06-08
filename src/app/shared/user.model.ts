export class User {
  constructor(public id: number,
              public firstName: string,
              public lastName: string,
              public email: string,
              public country: string,
              public city: string,
              public emailVerified: boolean,
              public userRole: string,
              public deleted: boolean) {}
}

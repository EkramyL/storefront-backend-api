import { User, UserStore } from '../user';

const store = new UserStore();
const user: User = {
  firstname: 'Ekramy',
  lastname: 'Latief',
  username: 'Ekramyl',
  password: 'password',
};
const newUser: User = { ...user, id: 1 };
describe('it describe the user model', () => {
  it('should have index method', () => {
    expect(store.index).toBeDefined;
  });

  it('should have show method', () => {
    expect(store.show).toBeDefined;
  });

  it('should have create method', () => {
    expect(store.create).toBeDefined;
  });

  // it('create method should add user', async () => {
  //   const user: User = {
  //     firstName: 'Ekramy',
  //     lastName: 'Latief',
  //     userName: 'Ekramyl',
  //     password: 'password',
  //   };
  //   const result = await store.create(user);
  //   const newUser: User = { ...user, id: 1 };
  //   expect(result.id).toEqual(newUser.id);
  //   expect(result.firstName).toEqual(newUser.firstName);
  //   expect(result.lastName).toEqual(newUser.lastName);
  //   expect(result.userName).toEqual(newUser.userName);
  // });

  it('create method should add a user', async () => {
    const result = await store.create(user);
    // const newUser: User = { ...user, id: 1 };
    expect(result.id).toEqual(newUser.id);
    expect(result.firstname).toEqual(newUser.firstname);
    expect(result.lastname).toEqual(newUser.lastname);
    expect(result.username).toEqual(newUser.username);
  });

  it('indexing all users', async () => {
    const result = await store.index();

    expect(result[0].id).toEqual(newUser.id);
    expect(result[0].firstname).toEqual(newUser.firstname);
    expect(result[0].lastname).toEqual(newUser.lastname);
    expect(result[0].username).toEqual(newUser.username);
  });

  it('show a user with id=1', async () => {
    const result = await store.show('1');
    expect(result.id).toEqual(newUser.id);
    expect(result.firstname).toEqual(newUser.firstname);
    expect(result.lastname).toEqual(newUser.lastname);
    expect(result.username).toEqual(newUser.username);
  });
});

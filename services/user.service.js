const faker = require('faker');
const boom = require('@hapi/boom');

class UsersService{

  constructor(){
    this.users = [];
    this.generate();
  }

  generate(){
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      });
    }
  }

  async create(data){
    const newUser = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.users.push(newUser);
    return newUser;
  }

  async find(){
    return this.users;
  }

  async findOne(id){
    const user=  this.users.find(item => item.id === id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async update(id,changes){
    const index = this.users.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('User not found');
    }else{
      const user = this.users[index];
      this.users[index] = {
        ...user,
        ...changes
      }
      return this.users[index];
    }
  }

   async delete(id){
    const index = this.users.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('User not found');
    }else{
      this.users.splice(index,1)
      return {id};
    }
  }

}


module.exports = UsersService;

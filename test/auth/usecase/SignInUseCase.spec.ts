import 'mocha'
import chai, {expect } from 'chai'
import SignInUseCase from '../../../src/auth/usecases/SigInUseCase';
import IAuthRepository from '../../../src/auth/domain/IAuthRepository';
import IPasswordService from '../../../src/auth/services/IPasswordService';
import FakeRepository from '../helpers/FakeRepository';
import FakePasswordService from '../helpers/FakePasswordService';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised)

describe('SignInUseCase', () => {
    let sut : SignInUseCase
    let repository : IAuthRepository
    let passwordService : IPasswordService

    const user = {
        email: 'tranvana@gmail.com',
        id : '1234',
        name: 'kevin',
        password: '$2b$10$K0HEqyYUlQLaj.Xkp9tDzuRclzJqdKCYV7gEHtSVIlu8NRtLM6flC',
        type : 'email'
    }

    beforeEach(()=>{
        repository = new FakeRepository()
        passwordService = new FakePasswordService()
        sut = new SignInUseCase(repository, passwordService)
    })

    it('Should throw error when user is not found', async ()=>{
        const user = {email:'wrongemail@gmail.com',password:'1234'}

        //assert
        await expect(sut.execute(user.email, user.password)).to.be.rejectedWith('User not found')
    })
    
});


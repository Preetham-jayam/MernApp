import bcrypt from 'bcryptjs';

const users=[
    {
        name:'Admin User',
        email:'admin@email.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true,
    },
    {
        name:'Preetham',
        email:'preetham@email.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true,
    },
    {
        name:'Chaitanya',
        email:'chaitu@email.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true,
    },
]

export default users;
// fetches user regiter, login, and getinfo routes data from supabase

const supabase = require('../config/supabase');

class AuthRepository{
        // register user
    register = async (params) => {
        // params has
        // first_name, last_name, email, password, phone_no, gender

        // check if user already exists
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', params.email)

        if (error) {
            return { error }
        }

        if (user.length > 0) {
            return { error: 'User already exists' }
        }   

        // create user
        const { data, error: createError } = await supabase
            .from('users')
            .insert([
                {
                    name: params.first_name + ' ' + params.last_name,
                    email: params.email,
                    password: params.password,
                    phone_no: params.phone_no,
                    gender: params.gender
                }
            ])
            .select();

        if (createError) {
            return { error: createError }
        }


        // check if user created
        if (data.length == 0) {
            return { error: 'User not created' }
        }


        return { data: data[0]} 
    }

    // login 
    login = async (params) => {
        /// params has email and password

        // check if user exists
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', params.email)

        if (error) {
            return { error }
        }

        if (user.length == 0) {
            return { error: 'User does not exist' }
        }

        return { data: user[0] }
    }
}


module.exports = AuthRepository;

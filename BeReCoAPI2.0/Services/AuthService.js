const { User } = require('../db');
const bcrypt = require('bcrypt');

module.exports = class AuthService {

    

    /** User Login- Authenticate User Credentials {username,password}
     * And Authorize User To Use API
    * 
    * @param {Object} data {username: username, password: password}
    * @return {Object|null} Profile of User Logged In
    *
    * */

    async login(data) {
        try {
            const { username, password } = data;
            // Find User Record By Username
            await User.findOne({
                where: { username: username }
            })
                .then((user) => {
                    // Validate user password
                    if (user) {
                        const isPasswordValid = user.validPassword(password);
                        if (isPasswordValid) {
                            //Return User Profile
                            const profile = user.findProfile({
                                where: {
                                    userId: id
                                }
                            })
                            return profile
                        } else {
                            throw new Error('Invalid Password');
                        }
                    } else {
                        throw new Error('User Not Found');
                    }
                })
        }
        catch (err) {
            throw new Error(err.message);
        }
        
    }

    /** User Register- Create A New User Record And A NeW User Profile
     * 
    * 
    * @param {Object} data {user: ...userInfo, profile: ...userProfile}
    * @return {Object|null} new user record and profile
    *
    * */
    

    async register(data) {
        const user = {
            username: data.username,
            password: data.password,
            email: data.email,
            role: data.role
        }

        const profile = {
            firstName: data.firstName,
            lastName: data.lastName,
            DOB: data.DOB,
            phoneNumber: data.phoneNumber

        }
        
        try {
            // FInd user record, if not found create one 
            await User.findOne({
                where: {
                    username: data.username
                }
            }).then(async (createUser) => {
                if (createUser) {
                    throw new Error('user already exists')
                } else {
              
                     await User.create(user)
                        .then(async newUser => {
                            const newProfile = await newUser.createProfile(profile)
                            return { user: newUser, profile:newProfile }
                        })
                        .then((result) => {
                            const newUserProfile = {
                                user: result.user, profile: result.newProfile
                            }
                        
                    console.log(result, newUserProfile)
                
                            if (result) {
                                return newUserProfile
                            } else {
                                throw new Error('Error Creating User')
                            }
                        })
                
                
                        .catch(err => {
                            throw Error(err)
                        })
                }
            })
        } catch (err) {
            return Error(err)
        }
    }
}
        


//     const register = (req, res) => {
//         const username = req.body.username
//         const password = req.body.password
//         const user = {
//             username: username,
//             password: password,
//             email: req.body.email,
//             role: req.body.role
//         }

//         const profile = {
//             userId: user.Id,
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             DOB: req.body.DOB,
//             phoneNumber: req.body.phoneNumber
//         }


//         User.create(user)
//             .then(async (result) => {
//                 const newProfile = await result.createProfile(profile)
//                 const newUser = result
//                 return { newUser, newProfile }
//             })
//             .then((data) => {
//                 if (data) {

//                     res.send(data)
//                 }
//             })
//             .catch((err) => {
//                 res.send({ message: err + '  Error User Not Created' })
//             })

//     }
//     exports = {
//         login,
//         register
//     }

// }

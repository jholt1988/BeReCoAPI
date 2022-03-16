const  {User, Profile}  = require('../db');
const bcrypt = require('bcrypt');




    

    /** User Login- Authenticate User Credentials {username,password}
     * And Authorize User To Use API
    * 
    * @param {Object} data {username: username, password: password}
    * @return {Object|null} Profile of User Logged In
    *
    * */

exports.login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // const user = User.authenticate(username, password)
        
    await  User.findOne({
        where: { username: username }
    }).then(user => {
        user.getProfile({
                       
            where: { UserId: user.id }
        }
        )
            .then(profile => {
                res.status(202).send({ user, profile })
            })
            
    })
                
        .catch(err => {
            throw new Error(err.message);
        })
    
        

    }


    
    
               
                
        
    

    /** User Register- Create A New User Record And A NeW User Profile
     * 
    * 
    * @param {Object} data {user: ...userInfo, profile: ...userProfile}
    * @return {Object|null} new user record and profile
    *
    * */
    

    exports.register =  async (data) => {
        const { User: userData, Profile: userProfileData } = data
        let isReg;
        
        // check to see if user exists)
         User.userExist(userData.username, userData.email)
            .then(bool => {
                isReg = bool
                console.log(isReg)
                return isReg
            })
        if (isReg === false) {
            throw new Error('User already Exists. Please Login')
        } else {
            const newUser = await User.create(userData)
            const newProfile = await newUser.createProfile(userProfileData)
            const result = { User: newUser, Profile: newProfile }
                
            return result
            
    
            
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

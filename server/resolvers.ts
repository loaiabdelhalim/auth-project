const {User} = require("./models");
const {Items} = require("./models");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const JWT_SECRET = 'sdlkfoish23@#$dfdsknj23ST';

const resolvers = {
    Query: {
        async current(_, args, {user}) {
            if (user) {
                return await User.findOne({where: {id: user.id}});
            }
            throw new Error("Sorry, you're not an authenticated user!");
        }
    },

    Mutation: {
        async verifyToken(_, {token}) {
            if(!token){
                throw new Error('No token provided!')
            }
            const verifyStatus = jsonwebtoken.verify(token, JWT_SECRET)
            if(verifyStatus.id){
                return 'success'
            }
            else{
                throw new Error('JWT validation failed')
            }
        },
        async resetPassword(_, {email}) {
            // TODO: add node mailer to send new passwords to emails.
            // For now, it sends the password back to the user.
            if (!email) {
                throw new Error('Please provide email address!')
            }
            // Need to add email config and send the new password

            const user = await User.findOne({where: {email}});
            if (!user) {
                throw new Error(
                    "This email doesn't exist. Please, make sure to type the right email."
                );
            }
            const newPassword = String(Math.random() * 10000000 * Date.now());
            user.password = await bcrypt.hash(newPassword, 10);
            await user.save();

            return newPassword;
        },

        async register(_, {login, password, email}) {
            if (!login || !password || !email) {
                throw new Error('Incomplete data!')
            }
            const user = await User.create({
                login,
                password: await bcrypt.hash(password, 10),
                email
            });

            return jsonwebtoken.sign({id: user.id, login: user.login}, JWT_SECRET, {
                expiresIn: "3m",
            });
        },

        async login(_, {login, password}) {
            if (!login || !password) {
                throw new Error('Please provide a username/password')
            }
            const user = await User.findOne({where: {login}});

            if (!user) {
                throw new Error(
                    "This user doesn't exist. Please, make sure to type the right login."
                );
            }

            const valid = await bcrypt.compare(password, user.password);

            if (!valid) {
                throw new Error("You password is incorrect!");
            }

            return jsonwebtoken.sign({id: user.id, login: user.login}, JWT_SECRET, {
                expiresIn: "1d",
            });
        },

        async getAllRecords(_, {token}) {
            const records = await Items.findAll();
            return JSON.stringify(records);
        },

        async addRecord(_, {title, creator}) {
            if (!title) {
                throw new Error('Please add a record title')
            }
            const newRecord = await Items.create({
                title,
                creator
            });
            return newRecord.title;
        }
    },
};

module.exports = resolvers;
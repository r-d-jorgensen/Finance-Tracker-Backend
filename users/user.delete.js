import { object, string } from 'yup';
import connectionPool from '../_utilities/connection.js';
import APIError from '../_utilities/apiError.js';

export default deleteUserControler;

function deleteUserControler(req, res, next) {
    deleteUser(req.body)
        .then(user => res.json(user))
        .catch(next);
}

let userSchema = object({
    username: string().matches(/^[a-zA-Z0-9!@#$%^&*?]+$/).min(5).required(),
    password: string().matches(/^[a-zA-Z0-9!@#$%^&*?]+$/).min(3).required(),
});

async function deleteUser(newUser) {
    newUser = await userSchema.validate(newUser);

    // TODO - This needs to cascade across all data that has user ID and use a trasaction
    const sql = ` DELETE FROM users WHERE username = ? AND password = ?`;
    const user = (await connectionPool.execute(sql, [newUser.username, newUser.password]))[0];
    if (user.affectedRows == 0) throw new APIError('Reject Data', 400, 'Failed to find user');

    return {
        message: "User was deleted successfully"
    };
}
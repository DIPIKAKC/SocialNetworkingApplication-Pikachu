import Users from "../models/Users.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body || {};

    try {

        if (!username || !email || !password) {
            return res.status(400).json({
                status: "error",
                message: "username, email and password are required",
            });
        }

        const hashPass = bcrypt.hashSync(password, 10)

        const newUser = await Users.create({
            username,
            email,
            password: hashPass
        });
        return res.status(200).json({ status: "success", message: "user registered successfully", data: newUser })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", message: error.message })
    }
}


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body || {};

        if (!email || !password) return res.status().json({ status: 'error', data: ('please provide your details to login') })

        let account = await Users.findOne({ email });
        if (!account) return res.status(404).json({ status: 'error', data: "User doesnot exist" })

        const pass = bcrypt.compareSync(password, account.password);
        if (!pass) return res.status(400).json({ status: 'error', data: "Invalid password" });

        const token = jwt.sign({
            id: account.id,
        }, 'secret');
        return res.status(200).json({
            status: 'success',
            data: {
                token
            }
        })

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}
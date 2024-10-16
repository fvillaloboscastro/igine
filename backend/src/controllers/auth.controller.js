const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user-model'); // Importa el modelo del usuario

// Función para crear un hash y una sal
const hashPassword = (password) => {
    const salt = crypto.randomBytes(16).toString('hex'); // Genera una sal
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`); // Crea el hash
    return { salt, hash };
};

// Función para verificar si la contraseña es correcta
const validatePassword = (password, hash, salt) => {
    const hashVerify = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
    return hash === hashVerify; // Compara el hash almacenado con el generado
};

// Registro de nuevo usuario
exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash de la contraseña usando una función hash que tengas definida
        const { salt, hash } = hashPassword(password);

        const newUser = new UserModel({
            email: email,
            password: hash, // Almacenar el hash de la contraseña
            salt: salt
        });

        const result = await newUser.save();
        res.status(201).json({
            message: 'User created',
            result: result
        });
    } catch (err) {
        console.error(err); // Registrar el error en la consola del servidor
        res.status(500).json({
            error: err.message
        });
    }
};


// Inicio de sesión
exports.login = async (req, res) => {
    let userFound;

    // Busca al usuario por email
    UserModel.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'User not found'
                });
            }
            userFound = user;

            // Compara la contraseña proporcionada con el hash almacenado usando la sal
            const isMatch = validatePassword(req.body.password, user.password, user.salt);
            if (!isMatch) {
                return res.status(401).json({
                    message: 'Password is incorrect'
                });
            }

            // Genera el token JWT si la contraseña es correcta
            const token = jwt.sign(
                { email: userFound.email, userId: userFound._id },
                "secret_string",
            );
            return res.status(200).json({
                token: token,
                expiresIn: 3600
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: 'Error with authentication'
            });
        });
};

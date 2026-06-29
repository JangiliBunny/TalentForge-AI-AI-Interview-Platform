// const jwt = require('jsonwebtoken');

// const auth= async (req, res, next)=>{
//     try{
//         const authHeader = req.header.authorization;
//         if(!token){
//             return res.status(401).json({
//                 success:false,
//                 message:"token missing"
//             });
//         }

//          const token = authHeader.split(" ")[1];
//          console.log(authHeader);
//          console.log(token);

//         const decode= jwt.verify(
//             token,
//             process.env.JWT_SECRET
//         )

//         req.user=decode;

//         next();
//     }catch(err){
//         console.log(err);
//         return res.status(401).json({
//             success:false,
//             message:"invalid token"
//         });
//     }
// }

// module.exports  = auth;


const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {

        // console.log("Headers:", req.headers);
        const authHeader = req.headers.authorization;

        // console.log("Authorization Header:", authHeader);

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Token missing"
            });
        }
        // console.log("Headers:", req.headers);
        // console.log("Authorization:", req.headers.authorization);
        const token = authHeader.split(" ")[1];

        // console.log("Token:", token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

         //console.log("Decoded:", decoded);

        req.user = decoded;

        next();

    } catch (err) {
        console.log(err);

        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};

module.exports = auth;
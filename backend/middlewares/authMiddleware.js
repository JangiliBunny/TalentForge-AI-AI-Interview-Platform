const jwt = require('jsonwebtoken');

const auth= async (req, res, next)=>{
    try{
        const token= req.header("Authorization");

        if(!token){
            return res.status(501).json({
                success:false,
                message:"token missing"
            });
        }

        const decode= jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        req.user=decode;

        next();
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"internal server error"
        });
    }
}

module.exports  = auth;
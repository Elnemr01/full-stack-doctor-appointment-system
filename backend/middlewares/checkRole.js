

const checkRole = (req,res,next)=> {
    const role=req.user.role;

    if(role!=="admin") {
        return res.status(403).json({
            status: "failed",
            message: "You are not authorized to perform this action"
        })
    }

    next();
}


export default checkRole;
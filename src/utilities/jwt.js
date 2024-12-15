// // import jwt from "jsonwebtoken";

// const secret = process.env.VITE_APP_JWT_SECRET_KEY;
// const jwtToeknGen = (data) => {
//     console.log(secret , "secret")
//   return jwt.sign({ data , clientSideDecodedToken : true }, secret);
// };
// const verifyJwt = (token) => {
//   try {
//     return jwt.verify(token, secret);
//   } catch (error) {
//     console.log("error while verifying the token", error);
//   }
// };

// const getTokenFromLocalStroge = () =>{
    
//     localStorage.getItem("token");

//     const decoded =  verifyJwt();

//     console.log(decoded)

//     if(decoded){
//         return decoded.data
//     }
//     else {
//         return null
//     }
// }
// export { jwtGen, verifyJwt , getTokenFromLocalStroge };

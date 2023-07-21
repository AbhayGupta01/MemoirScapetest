import jwt from 'jsonwebtoken';
import axios from 'axios';


// user wants to like a posts
// clicks the like => auth middleware(next) => like controller


//next mean after the function do 'next'
const auth = async (req, res, next) => {
  try {
    //cheking if user token is valid
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth){
      //this gives us data from token
      decodedData = jwt.verify(token, 'test')
      req.userId = decodedData?.id
    } else {
      const { data } = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: `Bearer ${token}` } }
      );

      req.user = { username: data?.name, userId: data?.sub };
    }
    // else {
    //   //google oauth token
    //   decodedData = jwt.decode(token);

    //   console.log(decodedData);
    //   //sub is googles word for id
    //   req.userId = decodedData?.sub;
    // }
    next();

  } catch (err) {
    console.log(err);
  }
}

export default auth;

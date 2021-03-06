const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_ID);


const googleverify = async(token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_ID,

    });
    const payload = ticket.getPayload();
    const { name, email, picture, given_name, family_name } = payload
    return { name, email, picture, given_name, family_name };

}

module.exports = {

    googleverify
}
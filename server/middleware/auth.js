import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

// This line creates an instance of OAuth2Client using the GOOGLE_CLIENT_ID environment variable.
// This suggests that this code is likely related to Google OAuth2 authentication. The OAuth2Client is typically used to verify Google OAuth2 tokens.
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// This code defines an auth middleware function that takes three parameters:
// req (request), res (response), and next (next middleware or route handler).
const auth = async (req, res, next) => {
  try {
    // This line extracts the JWT token from the Authorization header of the HTTP request.
    // JWT tokens are often sent in the format "Bearer {token}", and this code splits the header to get the token part [1].

    const token = req.headers.authorization.split(' ')[1];
    console.log(req.header);

    // This code checks if the token length is greater than 1000 characters.
    // This is a heuristic to determine if the token is a Google OAuth2 token because Google OAuth2 tokens tend to be long.
    // This is not a foolproof method and might need adjustments based on your specific use case.
    const googleToken = token.length > 1000;
    if (googleToken) {
      // If the token is identified as a Google token (based on the length heuristic), this block of code executes.

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      // This line uses the OAuth2Client instance created earlier to verify the Google JWT token (idToken) against the specified audience,
      // which is usually the client ID of your Google OAuth2 application. This verifies the token's authenticity.
      const payload = ticket.getPayload();

      // This code extracts the payload data (claims) from the verified token.
      // The payload typically contains information about the user, such as their Google user ID, name, email, and picture.

      // Here, the code creates a req.user object and assigns it the user's ID, name, picture URL, and a default role of 'basic'.
      // This is a common pattern for storing user information in the request object for use in subsequent middleware or route handlers.
      req.user = {
        id: payload.sub,
        name: payload.name,
        photoURL: payload.picture,
        role: "basic",
      };
      // If the token is not identified as a Google token (based on the length heuristic), this block of code executes.
    } else {
      // In this case, the code uses the jsonwebtoken library to verify the token.
      // It checks whether the token is valid and hasn't been tampered with, using the JWT_SECRET from your environment variables.
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const { id, name, photoURL, role } = decodedToken;
      // If the JWT token is valid, this code extracts user information from the token and stores it in the req.user object, similar to what was done in the Google token branch.
      req.user = { id, name, photoURL, role };
    }
    next();
    // Finally, the next() function is called to pass control to the next middleware or route handler in the Express middleware stack.

    // This is the catch block that handles any errors that occur in the try block.
    // If an error occurs, it is logged to the console, and a 401 (Unauthorized) response with an error message is sent back to the client.
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Something is wrong with your authorization!",
    });
  }
};
// Finally, the auth middleware function is exported for use in other parts of your application, typically in routes where authentication is required.
export default auth;

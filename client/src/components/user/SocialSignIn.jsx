import React from "react";
import {
  FormHelperText,
  SvgIcon,
  Typography,
  useTheme,
} from "@material-ui/core";
import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";

import { socialSignIn } from "../../firebase/firebaseFunctions";

const SocialSignIn = () => {
  const socialSignOn = async (provider) => {
    try {
      await socialSignIn(provider);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <GoogleLoginButton
        fullWidth
        onClick={() => socialSignOn("google")}
        style={{
          border: "1px solid #b4b6ba",
          fontSize: "17px",
          color: "#4082ED",
          marginBottom: "10px",
          fontWeight: "bold",
        }}
        size="40px"
        align="center"
      >
        <Typography>Continue with Google</Typography>
      </GoogleLoginButton>
      <FacebookLoginButton
        fullWidth
        onClick={() => socialSignOn("facebook")}
        style={{ fontSize: "17px", fontWeight: "bold" }}
        size="40px"
        align="center"
      >
        <Typography>Continue with Facebook</Typography>
      </FacebookLoginButton>
    </div>
  );
};

export default SocialSignIn;

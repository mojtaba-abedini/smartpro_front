import React, { useContext, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import StyledButtonLight from "../components/ButtonLight";
import "./RoutesStyle.css";

import { useNavigate } from "react-router-dom";
// import Logo from "../assets/logo.svg";
import axios from "axios";
import UserInfoContext from "../contexts/UserInfoContext";
import StyledSnackbar from "../components/Snackbar";
import { Box, TextField } from "@mui/material";
import styled from "@emotion/styled";

export default function UserEnterPhone() {
  const { setUserInfo } = useContext(UserInfoContext);
  const childRef = useRef(false);
  const navigate = useNavigate();
  let inputMobile = "";

  const [isLoading, setIsLoading] = useState(false);

  const handleState = (e) => {
    inputMobile = e.target.value;

  };

  const handleEnterClick = () => {
    if (inputMobile.length < 11 || !inputMobile.startsWith("09"))
      childRef.current.handleClick();
    else {
      setUserInfo({
        mobile: `${inputMobile}`,
      });

      setIsLoading(true);
      const data = { mobile: `${inputMobile}` };
      axios
        .post("/v1/auth/registerOrLogin", data, {
          headers: {
            Accept: "application/json",
       
          },
        })
        .then((response) => {
          if (response.data.message === "send OTP successfully" ) {
            
            navigate("/enter-code");
           

            localStorage.setItem('mobile',`${inputMobile}`);
             setIsLoading(false);
  
        }
        })
        .catch((err) => {
          console.log(err.message);
          setIsLoading(false);
        });
    }
  };



  const StyledTextField = styled(TextField)({
 
    input: {
      color: 'white',
    },

    "& label.Mui-focused": {
      color: "white",
    },
    "& label": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
  });






  return (
    <div className="grediant">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <Box sx={{ width: "300px" }}>
          {/* <img src={Logo} alt="Tezbar Logo" width={160} height={100} /> */}
          <p style={{ textAlign: "center" }} className="white-color">
            تلفن همراه خود را وارد کنید
          </p>
          <StyledTextField
           sx={{ width: "300px"}}
            variant="filled"
            inputProps={{
              maxLength: 11,
              min: 0,
              style: {
                textAlign: "center",
                paddingBottom: "15px",
                paddingTop: "15px",
              },
            }}
      
            onChange={handleState}
          />

          <div style={{ marginTop: "50px" }} onClick={handleEnterClick}>
            <StyledButtonLight
              isLoading={isLoading}
              variant="contained"
              size="large"
              title="دریافت کد تایید"
            />
          </div>
        </Box>
      </Grid>
      <StyledSnackbar
        messageText="شماره وارد شده صحیح نمی باشد"
        ref={childRef}
      />
    </div>
  );
}

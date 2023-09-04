import React, { useContext, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import StyledButtonLight from "../components/ButtonLight";
import "./RoutesStyle.css";
import { useNavigate } from "react-router-dom";
import Countdown from "react-countdown";
import UserInfo from "../contexts/UserInfoContext";
// import SettingContext from "../../contexts/SettingContext";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import StyledSnackbar from '../components/Snackbar'
import styled from "@emotion/styled";

export default function UserEnterCode() {



  const navigate = useNavigate();
  const childRef = useRef(false);
  const childRefResend = useRef(false);
  const { userInfo,setUserInfo } = useContext(UserInfo);
  // const { setSetting } = useContext(SettingContext);
  const [restart,setRestart]=useState(1);

  let code = "";

  const handleState = (e) => {
    code = e.target.value;
    
  };

  const checkOTP = () => {

    

    console.log(userInfo);

    if (code.length < 5)childRef.current.handleClick();
    else {
      const data = { mobile: `${userInfo.mobile}`,otp:`${code}` };
      axios
        .post("/v1/auth/checkOTP", data, {
          headers: {
            Accept: "application/json",
          },
        })
        .then((response) => { 
          if (response.data.message === 'token generated'){

           navigate("/home");

           localStorage.setItem('token',`${response.data.token}`);

            
            setUserInfo(prevState => ({
              mobile : prevState.mobile,
              token:`${response.data.token}`
            }));

            // setSetting(response.data);

      
          }

        }).catch(err => console.log(err.message));
    
       

    }

    


  
  };

  function resendCode(){

    childRefResend.current.handleClick();

    const data = { mobile: `${userInfo.mobile}` };
    axios
      .post("/v1/registerOrLogin", data, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => { console.log(response.data.message)}).catch(err => console.log(err.message));
      setRestart(restart+1);
  
    }



  const Completionist = () => (
    <Button variant="text" style={{
      color: "white",
      fontSize: "13px"
    }} onClick={resendCode}>
      ارسال مجدد کد تایید
    </Button>
  );
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
         return (
        <span>
          0{minutes}:{seconds > 9 ? seconds : '0'+seconds}
        </span>
      );
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
          
          <p style={{ textAlign: "center" }} className="white-color">
           کد پنج رقمی پیامک شده را وارد کنید
          </p>
        <StyledTextField
          sx={{ width: "100px"}}
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

        <div style={{color: "white",fontSize: "14px",marginTop: "30px",}}>
          <Countdown key={restart} date={Date.now() + 119000} renderer={renderer} />
        </div>

        <Button variant="text"
          style={{
            color: "white",
            fontSize: "13px",
          }}
          onClick={() => navigate(-1)}
        >
          تغییر شماره تلفن
        </Button>

        <div style={{ marginTop: "30px" }} onClick={checkOTP}>
          <StyledButtonLight
            sx={{ mb: 3 }}
            variant="contained"
            size="large"
            title="ورود به برنامه"
          />
        </div>
      </Grid>
      <StyledSnackbar messageText ="کد پنج رقمی را بصورت صحیح وارد کنید" ref={childRef}/>
      <StyledSnackbar messageText ="کد پنج رقمی مجددا ارسال شد" ref={childRefResend}/>
    </div>
  );
}

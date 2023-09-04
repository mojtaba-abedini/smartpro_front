import { CircularProgress, Container, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
// import UserInfo from "../contexts/UserInfoContext";

import StyledTextField from "../components/TextField";
import { useSpring, animated } from "@react-spring/web";
import axios from "axios";
import { cloneElement, forwardRef, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import {ReactComponent as LampIcon} from '../assets/lamp-svgrepo-com.svg';


const Fade = forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  // const { userInfo,setUserInfo } = useContext(UserInfo);
  const navigate = useNavigate();
  const [processors, setProcessors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();



  let procSerial = null;
  let procPass = null;

  useEffect(() => {


    getProcessorsList();

  }, []);



  function getProcessorsList() {
    const token = localStorage.getItem("token");
    axios
      .post(
        "/v1/processor/getProcessorsByToken",
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            // Authorization : `Bearer ${userInfo.token}`
          },
        }
      )
      .then((response) => {
        setProcessors(response.data.processors);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function addProccessors() {

    const token = localStorage.getItem("token");

    const data = { procId: `${procSerial}`, procPassword: `${procPass}`, pDavName: 'test', procType: 1 };

    axios
      .post(
        "/v1/processor/setProcessorsToUser",
        data,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            // Authorization : `Bearer ${userInfo.token}`
          },
        }
      )
      .then(() => {
        getProcessorsList();


        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });


    setOpen(false);

  }

  return (
    <Container maxWidth="md">
      <Stack
        spacing={3}
        style={{ height: "100%" }}
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 12, mb: 13 }}
      >
        {isLoading ? (
          <CircularProgress
            style={{ width: "25px", height: "25px", color: "primary" }}
          />
        ) : (
          <>
            <Button
              sx={{ px: 5, py: 1.5 }}
              variant="contained"
              onClick={handleOpen}
            >
              افزودن ابزار
            </Button>
            <Grid container spacing={{ xs: 1.5, md: 3 }} >
              {processors.map((item, index) => (
                <Grid item xs={6} sm={6} md={4} key={index}>
                  <Card sx={{ backgroundColor: `formbox.${theme.palette.mode}` }}>
                    <CardContent>
                      <Box sx={{display:'block',textAlign:'center'}}>{ theme.palette.mode==='dark' ? <LampIcon fill='white' style={{width:'90px',height:'90px',color:'red',margin:'20px'}}/> : <LampIcon fill='black' style={{width:'90px',height:'90px',color:'red',margin:'20px'}}/>}</Box>
                      <Typography
                        sx={{ fontSize: 14, textAlign: "center" }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {`شناسه ${item.id}`}
                      </Typography>

                      <Typography
                        sx={{ mb: 1.5, textAlign: "center" }}
                        color="text.secondary"
                      >
                        {`کد پروسسور ${item.procId}`}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        onClick={() => navigate(`/gadget-list/${item.procId}`)}
                        size="small"
                      >
                        مشاهده گجت ها
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>{" "}
          </>
        )}

        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              TransitionComponent: Fade,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Stack
                spacing={3}
                container
                direction="column"
                alignItems="center"
              >
                <p>شماره سریال و رمز ابزار را وارد کنید</p>

                <StyledTextField
                  change={(e) => (procSerial = e.target.value)}
                  value={procSerial}
                  label="سریال"
                  inputColor="black"
                  whiteText={false}
                  maxLength={100}
                  textAlign="right"
                />
                <StyledTextField
                  change={(e) => (procPass = e.target.value)}
                  value={procPass}
                  label="رمز"
                  inputColor="black"
                  whiteText={false}
                  maxLength={100}
                  textAlign="right"
                />

                <Button
                  sx={{ px: 5, py: 1.5 }}
                  variant="contained"
                  onClick={addProccessors}
                >
                  افزودن
                </Button>
              </Stack>
            </Box>
          </Fade>
        </Modal>
      </Stack>
    </Container>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";

import { CircularProgress, Container, Stack } from "@mui/material";

import { useParams } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";

import Grid from "@mui/material/Grid";

export default function GadgetList() {
  const procId = useParams();
  // const { userInfo } = useContext(UserInfo)
  const [isLoading, setIsLoading] = useState(true);
  const [gadgetList, setGadgetList] = useState([]);

  const data = { procId: `${procId.slug}` };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .post(
        "/v1/processor/getGadgetLists",
        data,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            // Authorization : `Bearer ${userInfo.token}`
          },
        }
      )
      .then((response) => {
        setGadgetList(response.data.gadgetLists);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });


  function handleChange(e,id){

   
    const token = localStorage.getItem("token");

    const data = { gadgetId: `${id}`,newValue: e.target.checked ===false ? 0 : 1  };

    axios
      .post(
        "/v1/gadget/setNewValue",
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
        console.log(`Change value ${e.target.checked} successfull ...`);
      })
      .catch((err) => {
        console.log(err.message);
      });


    
    
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
            <Grid container spacing={2}>
              {gadgetList.map((item) => (
                <Card
                  key={item.id}
                  sx={{ minWidth: 275, backgroundColor: "#e6e6e6" }}
                >
                  <CardContent>
                  <Stack
        spacing={3}
        style={{ height: "100%" }}
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 1}}
      >

                    {item.gadgetType === 1 ? (
                      <FormGroup >
                        <FormControlLabel
                          control={<Switch onChange={(e)=>handleChange(e,item.gadgetId)} defaultChecked />}
                          label={item.gCustomerName}
                        />
                      </FormGroup>
                    ) : null}
                     </Stack>
                  </CardContent>
                 
                
                </Card>
              ))}
            </Grid>{" "}
          </>
        )}
      </Stack>
    </Container>
  );
}

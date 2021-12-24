import React, { useEffect, useState } from "react";
import apiService from "../../services/apiService";
import JourneyCard from "./JourneyCard";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import {
  Grid,
  makeStyles,
  CssBaseline,
  InputLabel,
  Container,
  FormControl,
  Select,
  Typography,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "0 5em",
  },
  formControl: {
    minWidth: 180,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const JourneyListing = () => {
  const classes = useStyles();
  const [journeys, setJourneys] = useState([]);
  const [filter, setFilter] = useState("all");
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      try {
        const { journeys } = await apiService.getResource(
          `journeys?filter=${filter}`
        );
        setJourneys(journeys);
      } catch (e) {
        // TODO: Throw error and render component
        console.log("Not Found");
      }
    }
    fetchData();
    console.log(journeys);
  }, [filter]);

  var removeByAttr = function (journeys, attr, value) {
    var i = journeys.length;
    var journeys2 = [];
    while (i--) {
      if (
        journeys[i] &&
        journeys[i].hasOwnProperty(attr) &&
        arguments.length > 2 &&
        journeys[i][attr] === value
      ) {
        console.log(journeys[i]);
        journeys2 = journeys.splice(i, 1);
      }
    }
    console.log("updated journey", journeys2);
    history.push("/journeys");
  };

  const deleteJourney = async (id) => {
    console.log(journeys);
    const message = await apiService.deleteResource(`journeys/${id}`, id);
    console.log("Journey Deleted: " + message);
    console.log("old journey", journeys);
    removeByAttr(journeys, "_id", id);
  };

  const buildCards = () => {
    let cards =
      journeys.length > 0 &&
      journeys.map((journey) => {
        return (
          <Grid item md={4} xl={3} xs={12} key={journey._id}>
            <JourneyCard journey={journey} deleteJourney={deleteJourney} />
          </Grid>
        );
      });

    return cards;
  };

  return (
    <>
      <Helmet>
        <title>Roadster | Journeys</title>
      </Helmet>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <br />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography component="h5" variant="h5">
              <b style={{ fontFamily: "Dancing Script, cursive" }}>Journey's</b>
            </Typography>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item container justify="flex-end" xs={4}>
            <FormControl className={classes.formControl}>
              <InputLabel
                id="demo-simple-select-label"
                className={classes.formControl}
                shrink
              >
                Filter
              </InputLabel>

              <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className={classes.selectEmpty}
              >
                <MenuItem value="user"> My Journeys </MenuItem>
                <MenuItem value="all"> All Journeys </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={5}>
          {buildCards()}
        </Grid>
      </Container>
    </>
  );
};

export default JourneyListing;

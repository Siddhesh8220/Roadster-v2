// import { Doughnut } from "react-chartjs-2";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TripOriginIcon from "@material-ui/icons/TripOrigin";
import RoomIcon from "@material-ui/icons/Room";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    flexDirection: "column",
    alignItems: "center",
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    // backgroundColor: red[500],
  },
  oppositeContent: {
    flex: 0,
    paddingRight: 0,
    paddingLeft: 0,
  },
}));

const JourneyTimeline = ({ journey }) => {
  const classes = useStyles();

  const buildTimeline = () => {
    let timeline =
      journey.checkpoints.length > 0 &&
      journey.checkpoints.map((checkpoint, i) => {
        return (
          <TimelineItem key={checkpoint + i} style={{ minHeight: "50px" }}>
            <TimelineOppositeContent
              className={classes.oppositeContent}
              color="textSecondary"
            ></TimelineOppositeContent>
            <TimelineSeparator>
              <TripOriginIcon color="action" fontSize="small" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography>{checkpoint.formattedAddress}</Typography>
            </TimelineContent>
          </TimelineItem>
        );
      });

    return <>{timeline}</>;
  };

  return (
    <Card style={{ minHeight: "100vh" }}>
      <CardHeader title="Timeline" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: "relative",
          }}
        >
          <Timeline>
            <TimelineItem style={{ minHeight: "55px" }}>
              <TimelineOppositeContent
                className={classes.oppositeContent}
                color="textSecondary"
              ></TimelineOppositeContent>
              <TimelineSeparator>
                <TripOriginIcon color="action" fontSize="small" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography>{journey.origin.formattedAddress}</Typography>
              </TimelineContent>
            </TimelineItem>
            {buildTimeline()}
            <TimelineItem style={{ minHeight: "50px" }}>
              <TimelineOppositeContent
                className={classes.oppositeContent}
                color="textSecondary"
              ></TimelineOppositeContent>
              <TimelineSeparator>
                <RoomIcon color="action" />
              </TimelineSeparator>
              <TimelineContent>
                <Typography>{journey.destination.formattedAddress}</Typography>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </Box>
      </CardContent>
    </Card>
  );
};

export default JourneyTimeline;

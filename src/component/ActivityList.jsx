import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getActivities } from "../services/api.js";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import ActivityForm from "./ActivityForm.jsx"; // ✅ import form

const ActivityList = ({reload }) => {
    const [activities, setActivities] = useState([]);
    const navigate = useNavigate();

    const fetchActivities = async () => {
        try {
            const response = await getActivities();
            setActivities(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchActivities();
    }, [reload]);

    return (
        <Box sx={{ p: 2 }}>

            {/* ✅ Danh sách activity */}
            <Grid container spacing={2}>
                {activities.map((activity) => (
                    <Grid item key={activity.id} xs={12} sm={6} md={4}>
                        <Card
                            sx={{
                                cursor: "pointer",
                                transition: "0.3s",
                                "&:hover": { boxShadow: 6, transform: "scale(1.02)" },
                            }}
                            onClick={() => navigate(`/activities/${activity.id}`)}
                        >
                            <CardContent>
                                <Typography variant="h6">{activity.type}</Typography>
                                <Typography>Duration: {activity.duration} min</Typography>
                                <Typography>Calories: {activity.caloriesBurned}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ActivityList;

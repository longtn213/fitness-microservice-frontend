import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getActivityDetail} from "../services/api.js";
import {Box, Card, CardContent, Typography,Divider ,Button } from "@mui/material";

const ActivityDetail = () => {
    const {id} = useParams()
    const [activity, setActivity] = useState(null);
    const [recommendation,setRecommendation ] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchActivityDetails = async () => {
            try {
                const response = await getActivityDetail(id);
                setActivity(response.data)
                setRecommendation(response.data.recommendation);
            }catch(err) {
                console.log(err);
            }
        }
        fetchActivityDetails();
    }, [id]);
    if (!activity) {
        return <Typography>Loading...</Typography>;
    }
    return (
        <Box sx={{maxWidth: 800, mx:'auto', p:2}}>
            <Button
                variant="outlined"
                color="primary"
                sx={{ mb: 2 }}
                onClick={() => navigate(-1)} // quay lại trang trước
            >
                ← Back
            </Button>
            <Card sx={{mb:2}}>
                <CardContent>
                    <Typography variant="h5" gutterBottom> Activity Detail</Typography>
                    <Typography>Type: {activity.activityType}</Typography>
                    <Typography>Duration: {activity.duration} minutes</Typography>
                    <Typography>Calories Burned: {activity.caloriesBurned}</Typography>
                    <Typography>Date: {new Date(activity.createdAt).toLocaleString()}</Typography>
                </CardContent>
            </Card>
            {recommendation && (
                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>AI Recommendation</Typography>
                        <Typography variant="h6" >Analysis</Typography>
                        <Typography paragraph>{activity.recommendation}</Typography>

                        <Divider sx={{my:2}}/>
                        <Typography variant="h6">Improvements</Typography>
                        {activity?.improvements?.map((improvement,index) =>(
                            <Typography key={index} paragraph>{improvement}</Typography>
                        ))}

                        <Divider sx={{my:2}}/>
                        <Typography variant="h6">Suggestions</Typography>
                        {activity?.suggestions?.map((suggestions,index) =>(
                            <Typography key={index} paragraph>{suggestions}</Typography>
                        ))}

                        <Divider sx={{my:2}}/>
                        <Typography variant="h6">Safety</Typography>
                        {activity?.safety?.map((safety,index) =>(
                            <Typography key={index} paragraph>{safety}</Typography>
                        ))}

                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default ActivityDetail;
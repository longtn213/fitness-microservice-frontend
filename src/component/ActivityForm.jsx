import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField
} from '@mui/material';
import {addActivity} from "../services/api.js";
import { Snackbar, Alert } from "@mui/material";

const ActivityForm = ({ onActivityAdded }) => {
    const [open, setOpen] = useState(false);

    const [activity, setActivity] = useState({
        type: "RUNNING",
        duration: '',
        caloriesBurned: '',
        additionalMetrics: {}
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addActivity(activity);
            onActivityAdded?.();
            setActivity({ type: "RUNNING", duration: '', caloriesBurned: '' });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
                {/* Activity Type */}
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Activity Type</InputLabel>
                    <Select
                        value={activity.type}
                        label="Activity Type"
                        onChange={(e) => setActivity({ ...activity, type: e.target.value })}
                    >
                        <MenuItem value="RUNNING">RUNNING</MenuItem>
                        <MenuItem value="WALKING">WALKING</MenuItem>
                        <MenuItem value="CYCLING">CYCLING</MenuItem>
                        <MenuItem value="SWIMMING">SWIMMING</MenuItem>
                        <MenuItem value="WEIGHT_TRAINING">WEIGHT_TRAINING</MenuItem>
                        <MenuItem value="YOGA">YOGA</MenuItem>
                        <MenuItem value="HIT">HIT</MenuItem>
                        <MenuItem value="CARDIO">CARDIO</MenuItem>
                        <MenuItem value="STRETCHING">STRETCHING</MenuItem>
                        <MenuItem value="OTHER">OTHER</MenuItem>
                    </Select>
                </FormControl>

                {/* Duration */}
                <TextField
                    fullWidth
                    label="Duration (Minutes)"
                    type="number"
                    sx={{ mb: 2 }}
                    value={activity.duration}
                    onChange={(e) => setActivity({ ...activity, duration: e.target.value })}
                />

                {/* Calories */}
                <TextField
                    fullWidth
                    label="Calories Burned"
                    type="number"
                    sx={{ mb: 2 }}
                    value={activity.caloriesBurned}
                    onChange={(e) => setActivity({ ...activity, caloriesBurned: e.target.value })}
                />

                <Button type="submit" variant="contained" color="primary">
                    Add Activity
                </Button>
            </Box>
            <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
                <Alert severity="success" onClose={() => setOpen(false)}>
                    Hoạt động đã được thêm thành công!
                </Alert>
            </Snackbar>
        </>
    );
};

export default ActivityForm;

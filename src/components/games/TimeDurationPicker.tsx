import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function TimeDurationPicker() {
    const variants = [5, 10, 15, 20];
    const [variant, setVariant] = React.useState(variants[0]);

    const handleChange = (event: any) => {
        setVariant(event.target.value);
    };

    return (
        <div>
            <FormControl className="w-full">
                <Select
                    value={variant}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    name="duration"
                >
                    {variants.map((duration, index) => (
                        <MenuItem key={index} value={duration}>{duration} minutes</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

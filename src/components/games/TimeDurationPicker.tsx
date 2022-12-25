import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';

interface Props {
    field?: string;
    form: any;
    [key: string]: any;
}

export default function TimeDurationPicker({ field, form, ...props }: Props) {
    const variants = [5, 10, 15, 20];
    const [variant, setVariant] = useState(variants[0]);

    const handleChange = (event: any) => {
        setVariant(Number(event.target.value));
        form.setFieldValue('duration', Number(event.target.value));
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

import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function VariantDropdown() {
    const variants = ["Standard", "Crazyhouse", "King of the hill"];
    const [variant, setVariant] = React.useState(variants[0]);

    const handleChange = (event: SelectChangeEvent) => {
        setVariant(event.target.value);
    };

    return (
        <div>
            <FormControl className="w-full">
                <Select
                    value={variant}
                    onChange={handleChange}
                    displayEmpty
                    name='variant'
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    {variants.map((variant, index) => (
                        <MenuItem key={index} value={variant}>{variant}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

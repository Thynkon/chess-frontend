import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
    field?: string;
    form: any;
    [key: string]: any;
}

export default function VariantDropdown({ field, form, ...props }: Props) {
    const variants = ["standard", "crazyhouse"];
    const [variant, setVariant] = React.useState(variants[0]);

    const handleChange = (event: SelectChangeEvent) => {
        setVariant(event.target.value);
        form.setFieldValue('variant', event.target.value);
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
                        <MenuItem key={index} value={variant}>{variant.charAt(0).toUpperCase() + variant.slice(1)}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

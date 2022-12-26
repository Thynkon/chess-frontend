import * as React from 'react';
import { Select } from 'flowbite-react';

interface Props {
    field?: string;
    form: any;
    [key: string]: any;
}

export default function VariantDropdown({ field, form, ...props }: Props) {
    const variants = ["standard", "crazyhouse"];
    const [variant, setVariant] = React.useState(variants[0]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setVariant(event.target.value);
        form.setFieldValue('variant', event.target.value);
    };

    return (
        <div>
            <Select
                value={variant}
                name="variant"
                onChange={handleChange}
                required={true}
            >
                {variants.map((variant, index) => (
                    <option key={index} value={variant}>{variant.charAt(0).toUpperCase() + variant.slice(1)}</option>
                ))}
            </Select>
        </div>
    );
}

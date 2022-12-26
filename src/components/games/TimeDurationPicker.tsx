import * as React from 'react';
import { useState } from 'react';
import { Select } from 'flowbite-react';

interface Props {
    field?: string;
    form: any;
    [key: string]: any;
}

export default function TimeDurationPicker({ field, form, ...props }: Props) {
    const variants = [5, 10, 15, 20];
    const [variant, setVariant] = useState(variants[0]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setVariant(Number(event.target.value));
        form.setFieldValue('duration', Number(event.target.value));
    };

    return (
        <div>
            <Select
                value={variant}
                onChange={handleChange}
                name="duration"
            >
                {variants.map((duration, index) => (
                    <option key={index} value={duration}>{duration} minutes</option>
                ))}
            </Select>
        </div>
    );
}

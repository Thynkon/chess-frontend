import * as React from 'react';
import { useState } from 'react';
import { Select } from 'flowbite-react';

interface Props {
    field?: string;
    form: any;
    [key: string]: any;
}

export default function TimeDurationPicker({ field, form, ...props }: Props) {
    const durations: number[] = [];
    for (let i = 5; i <= 20; i += 5) {
        durations.push(i * 60);
    }
    const [variant, setVariant] = useState(durations[0]);

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
                {durations.map((duration, index) => (
                    <option key={index} value={duration}>{duration / 60} minutes</option>
                ))}
            </Select>
        </div>
    );
}

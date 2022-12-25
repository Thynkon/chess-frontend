import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';

interface Props {
    field?: string;
    values: any;
    form: any;
    [key: string]: any;
}

export default function LevelPicker({ field, values, form, ...props }: Props) {
    const [selectedOption, setSelectedOption] = useState(values[0]);
    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
        form.setFieldValue('level', Number((event.target.attributes as unknown as { [key: string]: Attr })["x-value"].value));
    }

    return (
        <Box className="w-full">
            <div
                className={"flex space-x-2 rounded-lg justify-between"}
                x-data="app"
            >
                {values.map((option: string) => (
                    <div key={option} className="w-full">
                        <input type="radio" name="option" id={String(option)} className="peer hidden" defaultChecked={selectedOption === option} onChange={handleOptionChange} x-value={option} />
                        <label
                            htmlFor={String(option)}
                            className="block cursor-pointer select-none rounded-lg p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white border-2 border-gray-50 hover:border-blue-500"
                        >
                            {option}
                        </label>
                    </div>
                ))}
            </div>
        </Box >
    );
}
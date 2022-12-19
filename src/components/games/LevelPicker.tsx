import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';

// export default function LevelPicker(props: { values: any[], onChange: any }) {
export default function LevelPicker({ field, values, form, ...props }) {
    const [selectedOption, setSelectedOption] = useState(values[0]);
    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
        form.setFieldValue('level', Number(event.target.attributes["x-value"].value));
    }

    return (
        <Box className="w-full">
            <div
                className={"flex space-x-2 rounded-xl justify-between"}
                x-data="app"
            >
                {values.map(option => (
                    <div key={option} className="w-full">
                        <input type="radio" name="option" id={String(option)} className="peer hidden" defaultChecked={selectedOption === option} onChange={handleOptionChange} x-value={option} />
                        <label
                            htmlFor={String(option)}
                            className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
                        >
                            {option}
                        </label>
                    </div>
                ))}
            </div>
        </Box >
    );
}
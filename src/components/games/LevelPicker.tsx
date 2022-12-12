import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function LevelPicker() {
    const levels = Array.from({ length: 4 }, (value, index) => index + 1);
    return (
        <Box sx={{ width: 300 }}>
            <div
                className="grid grid-cols-4 space-x-2 rounded-xl w-full"
                x-data="app"
            >
                {levels.map(option => (
                    <div key={option}>
                        <input type="radio" name="option" id={String(option)} className="peer hidden" />
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
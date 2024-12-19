import React, { useState } from 'react';

interface SelectHouseProps {
    setHouse: (house: number) => void;
    close: () => void;
    isClosable?: boolean;
    house?: number;
}

export const SelectHouse: React.FC<SelectHouseProps> = ({
    setHouse,
    isClosable,
    close,
    house
}) => {
    const [houseInput, setHouseInput] = useState(house ?? 0);

    return (
        <div>
            <div className='p-3'>
                <label>Enter your house number:</label>
                <input type="number" value={houseInput} className='ms-2'
                    onChange={(e) => setHouseInput(parseInt(e.target.value))} />
            </div>
            <button onClick={close} className='bg-red-700 bg-opacity-20'>{isClosable ? 'Discard' : 'Back'}</button>
            <button
                disabled={!houseInput || houseInput < 1 || houseInput > 75}
                className='bg-green-500 bg-opacity-20'
                onClick={() => {
                    setHouse(houseInput ?? 0)
                    close();
                }}>Save
            </button>
        </div>
    );
}
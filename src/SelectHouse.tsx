import React, { useState } from 'react';

interface SelectHouseProps {
    setHouse: (house: number) => void;
    isClosable?: boolean;
}

export const SelectHouse: React.FC<SelectHouseProps> = ({setHouse, isClosable}) => {
    const [houseInput, setHouseInput] = useState<number|undefined>(undefined);

    return (
        <div>
            <label>Enter your house number:</label>
            <input type="number" value={houseInput}
                   onChange={(e) => setHouseInput(parseInt(e.target.value))}/>
            {isClosable && <button onClick={() => setHouseInput(undefined)}>Discard</button>}
            <button disabled={!houseInput || houseInput < 1 || houseInput > 75} onClick={() => setHouse(houseInput ?? 0)}>Save</button>
        </div>
    );
}
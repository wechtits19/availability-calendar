import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Entry, {AvailabilityType} from './Entry';
import {fetchHouseAvailabilities, saveHouseAvailabilities} from './api';
import React from "react";

interface EditAvailabilityProps {
    house: number;
}

const EditAvailability: React.FC<EditAvailabilityProps> = ({house}) => {
    const [selected, setSelected] = React.useState<Entry[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        fetchHouseAvailabilities(house)
            .then((entries) => {
                setSelected(entries);
                setLoading(false);
            });
    }, []);

    const handleDateClick = (date: Date | null) => {
        if (!date) {
            console.error('No date selected!');
            return;
        }
        const isSelected = selected.some(e => e.date.toDateString() === date.toDateString())
        if (isSelected) {
            setSelected(selected.filter((e) => e.date.toDateString() !== date.toDateString()));
        } else {
            setSelected([...selected, {
                type: AvailabilityType.Available,
                date,
                house,
            }]);
        }
    };

    const onSave = (entries: Entry[]) => {
        saveHouseAvailabilities(house, entries);
    }

    return (
        <div>
            <div>
                <label>House Number: {house}</label>
            </div>
            {loading ? <div>Loading...</div> :
                <div>
                    <DatePicker
                        inline
                        onChange={handleDateClick}
                        highlightDates={selected.map((e) => e.date)}
                        // selected={selected.map((e) => e.date)}
                    />
                    <button onClick={() => onSave(selected)}>Save</button>
                </div>
            }
        </div>
    );
};

export default EditAvailability;

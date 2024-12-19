import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Entry, { AvailabilityType } from './Entry';
import { fetchHouseAvailabilities, saveHouseAvailabilities } from './api';
import React from "react";

interface EditAvailabilityProps {
    house: number;
    close: () => void;
}

const EditAvailability: React.FC<EditAvailabilityProps> = ({ house, close }) => {
    const [selected, setSelected] = React.useState<Entry[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        fetchHouseAvailabilities(house)
            .then((entries) => {
                entries.map(e=>e.date = new Date(e.date));
                setSelected(entries);
                setLoading(false);
            });
    }, []);

    const compareEntry = (a: Entry, b: Entry) => {
        if (a.date < b.date) {
            return -1;
        }
        if (a.date > b.date) {
            return 1;
        }
        return 0;
    }

    const handleDateClick = (date: Date | null) => {
        if (!date) {
            console.error('No date selected!');
            return;
        }
        console.log(selected);
        
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
        close();
    }

    return (
        <div>
            <div>
                <label>House Number: {house}</label>
            </div>
            {loading ? <div>Loading...</div> :
                <div>
                    <div>
                        <DatePicker
                            inline
                            onChange={handleDateClick}
                            highlightDates={selected.map((e) => e.date)}
                        />
                    </div>
                    <div>
                        <button onClick={close} className='bg-red-600 bg-opacity-20'>Back</button>
                        <button className='bg-green-500 bg-opacity-20' onClick={() => onSave(selected)}>Save</button>
                    </div>
                </div>
            }
        </div >
    );
};

export default EditAvailability;

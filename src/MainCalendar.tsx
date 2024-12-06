import React, {useState, useEffect} from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Entry from './Entry';
import {fetchAvailabilities} from './api';

interface MainCalendarProps {
    house?: number;
    setEditingHouse: (editing: boolean) => void;
}

const localizer = momentLocalizer(moment);

const MainCalendar: React.FC<MainCalendarProps> = ({
                                                       house,
                                                       setEditingHouse
                                                   }) => {
    const [entries, setEntries] = useState<Entry[]>([]);


    useEffect(() => {
        fetchAvailabilities().then(setEntries);
    }, []);


    // Map entries to calendar events
    if (!Array.isArray(entries)) {
        console.log(entries);
        return <div>Loading...</div>;
    }
    const events = entries.map((entry) => ({
        title: entry.house.toString(),
        start: entry.date,
        end: entry.date,
        alldDay: true,
    }));

    // ToDo: Highlight days with own house number

    return (
        <div style={{height: 500, position: 'relative'}}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px'
            }}>
                <h2>{house ? `House Number: ${house}` : 'No House Selected'}</h2>
                <button onClick={() => setEditingHouse(true)}>Edit</button>
            </div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{height: 'calc(100% - 50px)'}}
            />
        </div>
    );
};

export default MainCalendar;

import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Entry from './Entry';
import { fetchAvailabilities } from './api';

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
        fetchAvailabilities().then(entries => {
            entries.map(e => e.date = new Date(e.date))
            setEntries(entries)
        });
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
        <div className='h-full'>
            <div className='h-1/5 content-center'>
                {house ? `House Number: ${house}` : 'No House Selected'}
                <button onClick={() => setEditingHouse(true)}>Edit</button>
            </div>
            <div className='h-4/5'>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    views={['month', 'week']}
                    // step={1} // Reduces grid height
                    // timeslots={1} // Combines grid rows
                    min={new Date(2024, 0, 1, 0, 0, 0)} // Midnight
                    max={new Date(2024, 0, 1, 0, 0, 0)} // Midnight
                />
            </div>
        </div>
    );
};




export default MainCalendar;

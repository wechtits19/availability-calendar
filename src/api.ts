import axios from 'axios';
import Entry from './Entry';

const fetchAvailabilities = async (): Promise<Entry[]> => {
    const response = await axios.get('/api/availability');
    // return response.data;
    return [];
};

const fetchHouseAvailabilities = async (house: number): Promise<Entry[]> => {
    const response = await axios.get(`/api/availability/${house}`);
    // return response.data;
    return [];
};

const saveHouseAvailabilities = async (house: number, entries: Entry[]) => {
    await axios.post(`/api/availability/${house}`, entries);
};

export { fetchAvailabilities, fetchHouseAvailabilities, saveHouseAvailabilities };
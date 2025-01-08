// src/api.ts
import axios from 'axios';
import Entry from './Entry';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const fetchAvailabilities = async (): Promise<Entry[]> => {
    const response = await axios.get(`${API_URL}/availability`);
    return response.data;
};

const fetchHouseAvailabilities = async (house: number): Promise<Entry[]> => {
    const response = await axios.get(`${API_URL}/availability/${house}`);
    return response.data;
};

const saveHouseAvailabilities = async (house: number, entries: Entry[]) => {
    await axios.post(`${API_URL}/availability/${house}`, entries);
};

export { fetchAvailabilities, fetchHouseAvailabilities, saveHouseAvailabilities };
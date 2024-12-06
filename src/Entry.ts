export default interface Entry {
    type: AvailabilityType;
    house: number;
    date: Date;
}

export enum AvailabilityType {
    Available = 'Available',
}
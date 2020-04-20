export interface aCoordinates {
    lat: number;
    lng: number;
}
export interface aPlaceLocation extends aCoordinates {
    address: string;
    staticMapImageUrl: string;
}
export interface aAlert {
    snapshotId?: string,
    alertTitle: string
    hospitalId: string,
    hospitalName: string,
    date: string,
    bloodType: string,
    active: boolean,
    availableDonors: string[],
    contactedDonors: string[],
    declinedDonors: string[],
    acceptedDonor: string,
    dank:boolean
}
export interface aHospital {
    snapshotId?: string,
    id?: string,
    email: string,
    name: string,
    location: aPlaceLocation,
    alerts: aAlert[]
}
export interface aDonor {
    snapshotId?: string,
    id?: string,
    email: string,
    name: string,
    bloodType: string,
    location?: aPlaceLocation,
    fcmToken?: string
}

export interface story {
    snapshotId?: string
    hospitalId: string,
    storyTitle: string,
    imageUrl: string,
    storyDetails: string
}

export interface token{
    token: string
}
///////////////////////
//location model
export interface Coordinates {
    lat: number;
    lng: number;
}

export interface PlaceLocation extends Coordinates {
    address: string;
    staticMapImageUrl: string;
}

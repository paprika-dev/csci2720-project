  export function haversine(lat1, lon1, lat2, lon2) {

    const toRadians = (degree) => (degree * Math.PI) / 180;

    let dLat = toRadians(lat2 - lat1);
    let dLon = toRadians(lon2 - lon1);
    lat1 = toRadians(lat1);
    lat2 = toRadians(lat2);

    let a = Math.pow(Math.sin(dLat / 2), 2) + 
                Math.pow(Math.sin(dLon / 2), 2) * 
                Math.cos(lat1) * 
                Math.cos(lat2);
    let R = 6371; // Earth radius in km
    let c = 2 * Math.asin(Math.sqrt(a));

    return R * c;
}
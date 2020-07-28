export async function coordsFromAddress (address){
    const encodedAddress = encodeURI(address);
    const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`);
    if(!res.ok){
        throw new Error('Cant fetch the coords, try a new address')
    }
    const data = await res.json();
    // if(data.error_message){
    //     throw new Error('Something went wrong!')
    // }
    console.log(data);
    const coordinates = data.result[0].geometry.location;
    return coordinates;
}
interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface geocodeResult {
  county: string;
  formattedAddress: string;
}

export async function getCountyFromCordinates(
  latitude: number,
  longitude: number
): Promise<geocodeResult> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
  );
  const data = await response.json();

  const result = data.results[0];
  const countyComponent = result.address_components.find((component: AddressComponent) =>
    component.types.includes("country")
  );
  return {
    county: countyComponent?.long_name || "",
    formattedAddress: result.formatted_address,
  };
}
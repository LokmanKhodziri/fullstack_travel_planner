interface geocodeResult {
  county: string;
  formattedAddress: string;
}

export async function getCountyFromCordinates(
  latitute: number,
  longtute: number
): Promise<geocodeResult> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitute},${longtute}&key=${apiKey}`
  );
  const data = await response.json();

  const result = data.results[0];
  const countyComponent = result.address_components.find((component: any) =>
    component.types.includes("country")
  );
  return {
    county: countyComponent?.long_name || "",
    formattedAddress: result.formatted_address,
  };
}

export const fetchAccommodationData = async (postcode) => {
  try {
    const response = await fetch(`/api/demographic/get-accommodation?postcode=${encodeURIComponent(postcode)}`);
    if (!response.ok) throw new Error('Failed to fetch accommodation data');
    return response.json();
  } catch (error) {
    console.error('Error fetching accommodation data:', error);
    return null;
  }
}; 
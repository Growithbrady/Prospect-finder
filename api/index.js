// Prospect Finder API - Vercel Serverless Function
// This handles Google Places API calls to avoid CORS issues

const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // Enable CORS for all origins
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query, placeId, apiKey, action } = req.body || {};

  // Validate API key
  if (!apiKey) {
    return res.status(400).json({ error: 'API key required' });
  }

  // Validate action
  if (!action || !['search', 'details'].includes(action)) {
    return res.status(400).json({ error: 'Invalid action. Use "search" or "details"' });
  }

  try {
    let url;
    
    // Build the Google Places API URL based on action
    if (action === 'search') {
      if (!query) {
        return res.status(400).json({ error: 'Query required for search' });
      }
      url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`;
    } 
    else if (action === 'details') {
      if (!placeId) {
        return res.status(400).json({ error: 'placeId required for details' });
      }
      const fields = 'name,formatted_address,formatted_phone_number,website,rating,user_ratings_total,business_status,url';
      url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${apiKey}`;
    }

    // Make the request to Google Places API
    const response = await fetch(url);
    const data = await response.json();
    
    // Return the data
    res.status(200).json(data);
    
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch data from Google Places API',
      details: error.message 
    });
  }
};



export default async function handler(req, res) {
  try {
    const response = await fetch('https://zenquotes.io/api/random');
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch quote' });
    }

    const data = await response.json();
    res.status(200).json(data); 
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

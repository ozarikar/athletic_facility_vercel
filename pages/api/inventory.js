// pages/api/inventory.js
import { supabase } from '@lib/supabaseClient'; // Make sure this uses the alias now

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // We are adding .eq('is_archived', false) to the query
    const { data, error } = await supabase
      .from('inventory')
      .select('*')
      .eq('is_archived', false) // <-- THIS IS THE FIX
      .order('item_name');

    if (error) {
      console.error('GET error:', error);
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json(data);
  }

  // The POST method for adding new items remains the same
  if (req.method === 'POST') {
    try {
      const { item_name, category, total_quantity, description } = req.body;
      const { data, error } = await supabase
        .from('inventory')
        .insert([{ item_name, category, total_quantity, available_quantity: total_quantity, description }])
        .select();
      if (error) {
        console.error('POST error:', error);
        return res.status(500).json({ error: error.message });
      }
      return res.status(201).json(data[0]);
    } catch (err) {
      console.error('POST exception:', err);
      return res.status(500).json({ error: err.message || 'Unknown error' });
    }
  }

  res.status(405).end();
}
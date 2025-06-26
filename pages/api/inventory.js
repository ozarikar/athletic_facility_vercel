import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('inventory').select('*').order('item_name');
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }
  if (req.method === 'POST') {
    const { item_name, category, total_quantity, description } = req.body;
    const { data, error } = await supabase
      .from('inventory')
      .insert([{ item_name, category, total_quantity, available_quantity: total_quantity, description }]);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data[0]);
  }
  res.status(405).end();
}
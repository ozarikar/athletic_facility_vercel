import { supabase } from '../../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { itemId, quantity } = req.body;
    if (!itemId || !quantity || quantity < 1) {
      return res.status(400).json({ error: 'A valid Item ID and quantity are required.' });
    }

    // Call the database function
    const { error } = await supabase.rpc('restock_item', {
      item_id_to_update: itemId,
      quantity_to_add: quantity,
    });

    if (error) throw error;

    res.status(200).json({ message: 'Stock updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
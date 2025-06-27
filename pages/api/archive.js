import { supabase } from '../../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { itemId } = req.body;
    if (!itemId) {
      return res.status(400).json({ error: 'Item ID is required.' });
    }

    // This query finds the item by its ID and sets is_archived to true
    const { error } = await supabase
      .from('inventory')
      .update({ is_archived: true })
      .eq('id', itemId);

    if (error) throw error;

    res.status(200).json({ message: 'Item archived successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { person, item, team, quantity } = req.body;

    // Check available quantity
    const { data: inventory, error: invError } = await supabase
      .from('inventory')
      .select('available_quantity')
      .eq('item_name', item)
      .single();

    if (invError || !inventory) return res.status(400).json({ error: 'Item not found.' });
    if (inventory.available_quantity < quantity) return res.status(400).json({ error: 'Not enough stock.' });

    // Insert checkout
    const { data: checkout, error: checkoutError } = await supabase
      .from('checkouts')
      .insert([{ person, item, team, quantity }])
      .select();

    if (checkoutError) return res.status(500).json({ error: checkoutError.message });

    // Update inventory
    const { error: updateError } = await supabase
      .from('inventory')
      .update({ available_quantity: inventory.available_quantity - quantity })
      .eq('item_name', item);

    if (updateError) return res.status(500).json({ error: updateError.message });

    return res.status(201).json(checkout[0]);
  }
  res.status(405).end();
}
import { z } from 'zod';

export const schema = z
  .object({
    itemName: z
      .string({ message: 'Item Name is required' })
      .min(1, { message: 'Please enter an Item Name' }),
    price: z.coerce
      .number({ message: 'Price should be a number' })
      .min(0, { message: 'Please enter a price' }),
  })
  .required();

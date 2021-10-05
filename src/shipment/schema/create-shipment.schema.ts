import joi from 'joi';

export const shipmentItem = joi.object({
  chainId: joi.string().required(),
  sku: joi.string().required(),
  skuUuid: joi.string().guid()
});

export const createSchemaV2 = joi.object({
  items: joi.array()
    .required()
    .items(shipmentItem),
  description: joi.string(),
  bulk: joi.boolean().optional()
});

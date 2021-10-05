export class ShipmentItem {
  chainId: string;
  sku: string;
}

export class CreateShipmentDto {
  description: string;
  items: ShipmentItem[];
}

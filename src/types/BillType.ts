export enum EnumTVA {
   TVA_5_5 = 5.5,
   TVA_10 = 10,
   TVA_20 = 20,
}

export type LineType = {
   template_name?: string;
   id: number;
   name: string;
   description: string;
   unitPrice: number;
   quantity: number;
   tva: number;
};

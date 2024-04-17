export enum StructureName {
   PLATE = `plate`,
   TOTEM = `totem`,
   LED = `led`,
   CUSTOM = `custom`,
}

export type StructureType = {
   id: string;
   name: StructureName;
   label: string;
   img: string;
};

export type CustomOrderForm = {
   structure: StructureName | null;
   files: File[];
   message: string;
};

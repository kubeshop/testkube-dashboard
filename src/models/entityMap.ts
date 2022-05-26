export type EntityKey = string;
export type EntityValue = string;

export type Entity = {
  key: EntityKey;
  value: EntityValue;
};

export type EntityMap = Record<EntityKey, EntityValue>;

export type EntityArray = Entity[];

export type EntityKey = string;
export type EntityValue = string;

export type Entity = {
  key: EntityKey;
  value: EntityValue;
};

export type EntityMap<ValueType = EntityValue> = Record<EntityKey, ValueType>;

export type EntityArray = Entity[];

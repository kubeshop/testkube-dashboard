import {JSONSchema4} from 'json-schema';
import {cloneDeep} from 'lodash';

class JsonSchemaModifierUtils {
  private schema: JSONSchema4;

  public constructor(schema: JSONSchema4) {
    this.schema = schema;
  }

  public required(...names: string[]): this {
    if (this.schema.required && Array.isArray(this.schema.required)) {
      this.schema.required = [...this.schema.required, ...names];
    } else {
      this.schema.required = names;
    }
    return this;
  }

  public property(namePath: string): JsonSchemaModifierUtils {
    const path = namePath.split('.');
    let node = this.schema;
    while (path.length > 0) {
      const property = path.shift()!;
      if (!node.properties) {
        node.properties = {};
      }
      if (!node.properties[property]) {
        node.properties[property] = {};
      }
      node = node.properties[property];
    }
    return new JsonSchemaModifierUtils(node);
  }

  public merge(values: Record<string, any>): this {
    Object.assign(this.schema, values);
    return this;
  }

  public replace(values: Record<string, any>): this {
    Object.keys(this.schema).forEach(key => {
      delete this.schema[key];
    });
    Object.assign(this.schema, values);
    return this;
  }
}

export function createSchemaOverride(
  fn: (utils: JsonSchemaModifierUtils, schema: JSONSchema4) => void
): (schema: JSONSchema4) => JSONSchema4 {
  return schema => {
    const schemaCopy = cloneDeep(schema);
    fn(new JsonSchemaModifierUtils(schemaCopy), schemaCopy);
    return schemaCopy;
  };
}

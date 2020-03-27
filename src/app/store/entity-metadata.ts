import { EntityMetadataMap, EntityDataModuleConfig } from "@ngrx/data";
import { TodoItemModel } from "./models";
import { Pluralizer } from "@ngrx/data";

const entityMetadata: EntityMetadataMap = {
  TodoItemModel: {
    entityName: "todo-item"
  }
};

const pluralNames = {};

export class TodoPluralizer extends Pluralizer {
  pluralize(name: string) {
    return name;
  }
}

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};

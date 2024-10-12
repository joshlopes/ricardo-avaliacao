import { AbstractStringVo } from './AbstractStringVo'

import { v7 as uuidv7 } from 'uuid'

export abstract class Id<T> extends AbstractStringVo<T> {
  public static fromString<T extends Id<T>>(this: new (id: string) => T, id: string): T {
    return new this(id)
  }

  public static generate<T extends Id<T>>(this: new (id: string) => T): T {
    return new this(uuidv7())
  }
}

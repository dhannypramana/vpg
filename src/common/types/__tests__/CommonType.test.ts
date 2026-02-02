import type { App } from 'vue';
import type {
    Nullable,
    ObjectKeys,
    ObjectValues,
    SelectOption,
    SetupModule,
    Undefined,
} from '../CommonType';
import { describe, expectTypeOf, it } from 'vitest';

describe('types', () => {
    it('objectKeys should infer keys correctly', () => {
        type User = {
            id: number;
            name: string;
        };

        expectTypeOf<ObjectKeys<User>>().toEqualTypeOf<'id' | 'name'>();
    });

    it('objectValues should infer values correctly', () => {
        type User = {
            id: number;
            name: string;
        };

        expectTypeOf<ObjectValues<User>>().toEqualTypeOf<number | string>();
    });

    it('nullable should add null to type', () => {
        expectTypeOf<Nullable<string>>().toEqualTypeOf<string | null>();
    });

    it('undefined should add undefined to type', () => {
        expectTypeOf<Undefined<number>>().toEqualTypeOf<number | undefined>();
    });

    it('selectOption should map label and value types', () => {
        type Option = SelectOption<string, number>;

        expectTypeOf<Option>().toEqualTypeOf<{
            label: string;
            value: number;
        }>();
    });

    it('setupModule should accept Vue App and return void', () => {
        expectTypeOf<SetupModule>().toEqualTypeOf<
            (app: App<Element>) => void
        >();
    });
});

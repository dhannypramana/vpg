/* eslint ts/consistent-type-definitions: 0 */
import type { AnyObject, Maybe } from 'yup/lib/types';
import * as yup from 'yup';

declare module 'yup' {
    interface StringSchema<
        TType extends Maybe<string> = string,
        TContext = AnyObject,
        TDefault = undefined,
        TFlags extends Flags = '',
    > extends Schema<TType, TContext, TDefault, TFlags> {
        validatePhoneNumber: () => StringSchema<TType, TContext>;
    }
}

export default yup;

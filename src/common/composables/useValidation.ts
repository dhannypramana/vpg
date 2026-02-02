import type { StringSchema } from 'yup';

export function useValidation() {
    addMethod<StringSchema>(
        string,
        'validatePhoneNumber',
        function validatePhoneNumber() {
            return this.test({
                message({ label }: { label: string }) {
                    return `${label} harus diawali 08 dan memiliki 10-13 digit.`;
                },
                test: value => /^08\d{8,11}$/.test(String(value)),
            });
        },
    );

    setLocale({
        mixed: {
            required: ({ label }: { label: string }) => `Silahkan isi ${label} terlebih dahulu.`,
            notType: <T>({ label, type }: { label: string; type: T }) => `Kolom ${label} harus bertipe ${type}.`,
        },
        number: {
            min: ({ label, min }: { label: string; min: number }) => `${label} harus diisi dengan minimal ${min} karakter.`,
            max: ({ label, max }: { label: string; max: number }) => `${label} harus diisi dengan maksimal ${max} karakter.`,
        },
        string: {
            email: ({ label }: { label: string }) => `${label} harus berupa alamat email yang valid.`,
            min: ({ label, min }: { label: string; min: number }) => `${label} harus diisi dengan minimal ${min} karakter.`,
            max: ({ label, max }: { label: string; max: number }) => `${label} harus diisi dengan maksimal ${max} karakter.`,
        },
    });
}

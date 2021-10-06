import { Notyf } from 'notyf';
import { escapeHtml } from '@utils';

const notyfOptions = {
    position: {
        x: 'right',
        y: 'top'
    },
    duration: 3000,
    dismissible: true
};

export function showSmallError(e: any, pureText: boolean = false): void {
    const notyf = new Notyf();

    // @ts-ignore
    notyf.error({ message: pureText ? escapeHtml(e.message ? e.message : String(e)) : e, ...notyfOptions });
}

export function showSmallSuccess(message: string) {
    const notyf = new Notyf();

    // @ts-ignore
    notyf.success({ message: escapeHtml(message), ...notyfOptions });
}

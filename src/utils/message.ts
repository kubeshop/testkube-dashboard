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

export function showSmallError(e: any): void {
    const notyf = new Notyf();

    // @ts-ignore
    notyf.error({ message: escapeHtml(e.message ? e.message : String(e)), ...notyfOptions });
}

export function showSmallSuccess(message: string) {
    const notyf = new Notyf();

    // @ts-ignore
    notyf.success({ message: escapeHtml(message), ...notyfOptions });
}

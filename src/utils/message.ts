import { Notyf } from 'notyf';
import { escapeHtml } from '@utils';

export function showSmallError(e: any, pureText: boolean = false, position?: string): void {
  const notyf = new Notyf();

  const notyfOptions = {
    position: {
        x: position || 'right',
        y: 'top'
    },
    duration: 3000,
    dismissible: true
};

    // @ts-ignore
    notyf.error({ message: pureText ? escapeHtml(e.message ? e.message : String(e)) : e,  ...notyfOptions });
}

import iziToast from 'izitoast/dist/js/iziToast';
import { IMessage } from './type';

const toastMessage = (message?: string, title?: string, buttonYes?: string, buttonNo?: string): Promise<boolean> => {
    const messageDefault: IMessage = {
        title: title || 'Onay gerekiyor',
        message: message || 'Bu işlemi gerçekleştirmek istediğinize emin misiniz?',
        position: 'center',
        progressBar: false,
        close: false,
        timeout: 5000000,
        overlay: true,
        overlayClose: false,
        displayMode: 1,
        zindex: 99999,
        maxWidth: 600,
        messageType: 'show',
        transitionIn: 'fadeIn',
        layout: 1,
        icon: false,
    };

    return new Promise((resolve) => {
        const iziMessage: any = {
            ...messageDefault,
            close: false,
            buttons: [
                [
                    `<button>${buttonNo || 'Hayır'}</button>`,
                    (instance: any, toast: any) => {
                        instance.hide(
                            { transitionOut: 'fadeOutUp', onClosing: () => resolve(false) },
                            toast,
                            'buttonName',
                        );
                    },
                ],
                [
                    `<button style="outline: none">${buttonYes || 'Evet'}</button>`,
                    (instance: any, toast: any) => {
                        instance.hide(
                            { transitionOut: 'fadeOutUp', onClosing: () => resolve(true) },
                            toast,
                            'buttonName',
                        );
                    },
                    true,
                ],
            ],
        };

        iziToast.question(iziMessage);
    });
};

export default toastMessage;

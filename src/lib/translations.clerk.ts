import type { DeepPartial, LocalizationResource } from "@clerk/types";

export const localization: Record<string, DeepPartial<LocalizationResource>> = {
    hu: {
        signIn: {
            start: {
                title: 'Bejelentkezés',
                subtitle: 'az áranjánlat készítő alkalmazásba',
            },
            password: {
                title: 'Írd be a jelszavad',
                subtitle: 'hogy beléphess az alkalmazásba',
            },
            forgotPasswordAlternativeMethods: {
                title: 'Elfelejtette a jelszavát?',
                blockButton__resetPassword: 'Jelszó visszaállítása',
                label__alternativeMethods: 'Bejelentkezés más módszerrel'
            },
            emailCode: {
                formSubtitle: 'Kód küldése emailben',
            },
        },
        userButton: {
            action__manageAccount: 'Profil adatok',
            action__signOut: 'Kijelentkezés'
        },
        formButtonPrimary: 'Tovább',
        formFieldLabel__emailAddress: 'Email cím',
        formFieldLabel__password: 'Jelszó',
        formFieldAction__forgotPassword: 'Elfelejtett jelszó?',
        backButton: 'Vissza'
    }
};

import { getOperatingSystem } from '@/lib/utils';

export enum KeyboardShortcutAction {
    REDO = 'redo',
    UNDO = 'undo',
}

export interface KeyboardShortcut {
    action: KeyboardShortcutAction;
    keyCombinationLabelMac: string;
    keyCombinationLabelWin: string;
    keyCombinationMac: string;
    keyCombinationWin: string;
}

export const keyboardShortcuts: Record<
    KeyboardShortcutAction,
    KeyboardShortcut
> = {
    [KeyboardShortcutAction.REDO]: {
        action: KeyboardShortcutAction.REDO,
        keyCombinationLabelMac: '⇧⌘Z',
        keyCombinationLabelWin: 'Ctrl+Shift+Z',
        keyCombinationMac: 'meta+shift+z',
        keyCombinationWin: 'ctrl+shift+z',
    },
    [KeyboardShortcutAction.UNDO]: {
        action: KeyboardShortcutAction.UNDO,
        keyCombinationLabelMac: '⌘Z',
        keyCombinationLabelWin: 'Ctrl+Z',
        keyCombinationMac: 'meta+z',
        keyCombinationWin: 'ctrl+z',
    },
};

export interface KeyboardShortcutForOS {
    action: KeyboardShortcutAction;
    keyCombinationLabel: string;
    keyCombination: string;
}

const operatingSystem = getOperatingSystem();

export const keyboardShortcutsForOS: Record<
    KeyboardShortcutAction,
    KeyboardShortcutForOS
> = Object.keys(keyboardShortcuts).reduce(
    (acc, action) => {
        const keyboardShortcut =
            keyboardShortcuts[action as KeyboardShortcutAction];
        const keyCombinationLabel =
            operatingSystem === 'mac'
                ? keyboardShortcut.keyCombinationLabelMac
                : keyboardShortcut.keyCombinationLabelWin;
        const keyCombination =
            operatingSystem === 'mac'
                ? keyboardShortcut.keyCombinationMac
                : keyboardShortcut.keyCombinationWin;

        return {
            ...acc,
            [action]: {
                action: keyboardShortcut.action,
                keyCombinationLabel,
                keyCombination,
            },
        };
    },
    {} as Record<KeyboardShortcutAction, KeyboardShortcutForOS>
);

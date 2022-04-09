import type { LocaleConfig } from '@vuepress/shared';
import type { PropType } from 'vue';
import '../styles/vars.css';
import '../styles/pwa-popup.css';
export declare type PwaPopupLocales = LocaleConfig<{
    message: string;
    buttonText: string;
}>;
export declare const PwaPopup: import("vue").DefineComponent<{
    locales: {
        type: PropType<PwaPopupLocales>;
        required: false;
        default: () => {};
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    locales: {
        type: PropType<PwaPopupLocales>;
        required: false;
        default: () => {};
    };
}>>, {
    locales: PwaPopupLocales;
}>;
export default PwaPopup;

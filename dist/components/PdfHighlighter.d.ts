import { PDFDocumentProxy } from 'pdfjs-dist';
import { EventBus, PDFViewer } from 'pdfjs-dist/legacy/web/pdf_viewer.mjs';
import { PDFViewerOptions } from 'pdfjs-dist/types/web/pdf_viewer';
import { PointerEventHandler, PureComponent, RefObject } from 'react';
import { Root } from 'react-dom/client';
import { IHighlight, LTWH, LTWHP, Position, Scaled, ScaledPosition } from '../types';
export type T_ViewportHighlight<T_HT> = {
    position: Position;
} & T_HT;
interface State<T_HT> {
    ghostHighlight: {
        position: ScaledPosition;
        content?: {
            text?: string;
            image?: string;
        };
    } | null;
    isCollapsed: boolean;
    range: Range | null;
    tip: {
        highlight: T_ViewportHighlight<T_HT>;
        callback: (highlight: T_ViewportHighlight<T_HT>) => JSX.Element;
    } | null;
    tipPosition: Position | null;
    tipChildren: JSX.Element | null;
    isAreaSelectionInProgress: boolean;
    scrolledToHighlightId: string;
}
interface Props<T_HT> {
    highlightTransform: (highlight: T_ViewportHighlight<T_HT>, index: number, setTip: (highlight: T_ViewportHighlight<T_HT>, callback: (highlight: T_ViewportHighlight<T_HT>) => JSX.Element) => void, hideTip: () => void, viewportToScaled: (rect: LTWHP) => Scaled, screenshot: (position: LTWH) => string, isScrolledTo: boolean) => JSX.Element;
    highlights: Array<T_HT>;
    onScrollChange: () => void;
    scrollRef: (scrollTo: (highlight: T_HT) => void) => void;
    pdfDocument: PDFDocumentProxy;
    pdfScaleValue: string;
    onSelectionFinished: (position: ScaledPosition, content: {
        text?: string;
        image?: string;
    }, hideTipAndSelection: () => void, transformSelection: () => void) => JSX.Element | null;
    enableAreaSelection: (event: MouseEvent) => boolean;
    pdfViewerOptions?: PDFViewerOptions;
}
export declare class PdfHighlighter<T_HT extends IHighlight> extends PureComponent<Props<T_HT>, State<T_HT>> {
    static defaultProps: {
        pdfScaleValue: string;
    };
    state: State<T_HT>;
    viewer: PDFViewer;
    resizeObserver: ResizeObserver | null;
    containerNode?: HTMLDivElement | null;
    containerNodeRef: RefObject<HTMLDivElement>;
    highlightRoots: {
        [page: number]: {
            reactRoot: Root;
            container: Element;
        };
    };
    unsubscribe: () => void;
    constructor(props: Props<T_HT>);
    componentDidMount(): void;
    attachRef: (eventBus: EventBus) => void;
    componentDidUpdate(prevProps: Props<T_HT>): void;
    init(): Promise<void>;
    componentWillUnmount(): void;
    findOrCreateHighlightLayer(page: number): Element | null;
    groupHighlightsByPage(highlights: Array<T_HT>): {
        [pageNumber: string]: Array<T_HT>;
    };
    showTip(highlight: T_ViewportHighlight<T_HT>, content: JSX.Element): void;
    scaledPositionToViewport({ pageNumber, boundingRect, rects, usePdfCoordinates, }: ScaledPosition): Position;
    viewportPositionToScaled({ pageNumber, boundingRect, rects, }: Position): ScaledPosition;
    screenshot(position: LTWH, pageNumber: number): string;
    hideTipAndSelection: () => void;
    setTip(position: Position, inner: JSX.Element | null): void;
    renderTip: () => import("react/jsx-runtime").JSX.Element | null;
    onTextLayerRendered: () => void;
    scrollTo: (highlight: T_HT) => void;
    onDocumentReady: () => void;
    onSelectionChange: () => void;
    onScroll: () => void;
    onMouseDown: PointerEventHandler;
    handleKeyDown: (event: KeyboardEvent) => void;
    afterSelection: () => void;
    debouncedAfterSelection: () => void;
    toggleTextSelection(flag: boolean): void;
    handleScaleValue: () => void;
    debouncedScaleValue: () => void;
    render(): import("react/jsx-runtime").JSX.Element;
    private renderHighlightLayers;
    private renderHighlightLayer;
}
export {};

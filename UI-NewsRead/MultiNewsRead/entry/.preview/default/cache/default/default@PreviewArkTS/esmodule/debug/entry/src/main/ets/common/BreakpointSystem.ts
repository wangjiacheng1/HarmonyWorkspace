import mediaquery from "@ohos:mediaquery";
import Constants from "@bundle:com.example.myapplication/entry/ets/common/Constants";
interface Breakpoint {
    name: string;
    size: number;
    mediaQueryListener?: mediaquery.MediaQueryListener;
}
export class BreakpointSystem {
    private currentBreakpoint: string = Constants.BREAKPOINTS[1];
    private breakpoints: Breakpoint[] = [
        { name: 'sm', size: 320 },
        { name: 'md', size: 600 },
        { name: 'lg', size: 840 }
    ];
    private updateCurrentBreakpoint(breakpoint: string) {
        if (this.currentBreakpoint !== breakpoint) {
            this.currentBreakpoint = breakpoint;
            AppStorage.setOrCreate<string>('currentBreakpoint', this.currentBreakpoint);
            console.log('on current breakpoint: ' + this.currentBreakpoint);
        }
    }
    public register() {
        this.breakpoints.forEach((breakpoint: Breakpoint, index) => {
            let condition: string;
            if (index === this.breakpoints.length - 1) {
                condition = '(' + breakpoint.size + 'vp<=width' + ')';
            }
            else {
                condition = '(' + breakpoint.size + 'vp<=width<' + this.breakpoints[index + 1].size + 'vp)';
            }
            breakpoint.mediaQueryListener = mediaquery.matchMediaSync(condition);
            breakpoint.mediaQueryListener.on('change', (mediaQueryResult) => {
                if (mediaQueryResult.matches) {
                    this.updateCurrentBreakpoint(breakpoint.name);
                }
            });
        });
    }
    public unregister() {
        this.breakpoints.forEach((breakpoint: Breakpoint) => {
            if (breakpoint.mediaQueryListener) {
                breakpoint.mediaQueryListener.off('change');
            }
        });
    }
}

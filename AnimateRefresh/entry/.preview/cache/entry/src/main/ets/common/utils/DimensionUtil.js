import { GlobalContext } from '@bundle:com.huawei.animaterefresh/entry/ets/common/utils/GlobalContext';
let context = getContext(this);
const DESIGN_WIDTH = 360;
const DESIGN_HEIGHT = 780;
/**
 * Fits tools with different sizes and lengths
 */
export default class DimensionUtil {
    static adaptDimension(value) {
        let deviceDisplay = GlobalContext.getContext().getObject('display');
        let widthScale = deviceDisplay.width / DESIGN_WIDTH;
        let virtualHeight = widthScale * DESIGN_HEIGHT;
        let designDim = Math.sqrt(DESIGN_WIDTH * DESIGN_WIDTH + DESIGN_HEIGHT * DESIGN_HEIGHT);
        let virtualDim = Math.sqrt(deviceDisplay.width * deviceDisplay.width + virtualHeight * virtualHeight);
        return virtualDim * value / designDim;
    }
    /**
     * Obtains the screen horizontal adaptation px.
     */
    static getPx(value) {
        let beforeVp = context.resourceManager.getNumber(value.id);
        return DimensionUtil.adaptDimension(beforeVp);
    }
    /**
     * Obtains the screen horizontal adaptation vp.
     */
    static getVp(value) {
        let beforeVp = context.resourceManager.getNumber(value.id);
        return px2vp(DimensionUtil.adaptDimension(beforeVp));
    }
    /**
     * Obtains the screen horizontal adaptation fp.
     */
    static getFp(value) {
        let beforeFp = context.resourceManager.getNumber(value.id);
        return px2fp(DimensionUtil.adaptDimension(beforeFp));
    }
}
//# sourceMappingURL=DimensionUtil.js.map
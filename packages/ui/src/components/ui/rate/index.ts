// rate/index.ts
// Public API

import RateRoot from "./Rate";
import { RateStars, RateStar } from "./RateStars";
import { RateLabel } from "./RateLabel";
import { RateDescription } from "./RateDescription";
import { RateValue, RateTextLabel } from "./RateValue";
import { RateContainer } from "./RateContainer";
import { RateErrorText } from "./RateErrorText";

const Rate = Object.assign(RateRoot, {
    Label: RateLabel,
    Description: RateDescription,
    Stars: RateStars,
    Star: RateStar,
    Value: RateValue,
    TextLabel: RateTextLabel,
    Container: RateContainer,
    ErrorText: RateErrorText,
});

export { Rate as default };
export { Rate };

export type {
    RateContainerProps,
    RateDescriptionProps,
    RateErrorTextProps,
    RateLabelProps,
    RateRootProps,
    RateSize,
    RateStarProps,
    RateStarsProps,
    RateTextLabelProps,
    RateValueProps,
} from "./types";

// rate/index.ts
// Public API

import RateRoot from "./rate";
import { RateStars, RateStar } from "./stars";
import { RateLabel } from "./label";
import { RateDescription } from "./description";
import { RateValue, RateTextLabel } from "./value";
import { RateContainer } from "./container";
import { RateErrorText } from "./error-text";

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

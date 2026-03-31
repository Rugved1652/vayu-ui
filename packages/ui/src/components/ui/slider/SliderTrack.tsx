// UI: Track + Range fill

import { forwardRef, Ref } from "react";

interface SliderTrackProps {
    min: number;
    max: number;
    values: number[];
}

const sliderTrackStyles =
    "relative w-full grow overflow-hidden rounded-full h-1.5 bg-muted";

const sliderRangeStyles = "absolute h-full bg-brand";

const SliderTrack = forwardRef<HTMLDivElement, SliderTrackProps>(
    ({ min, max, values }, ref) => {
        return (
            <div
                ref={ref}
                className={sliderTrackStyles}
                aria-hidden="true"
            >
                {values.length > 1 ? (
                    <div
                        className={sliderRangeStyles}
                        style={{
                            left: `${((values[0] - min) / (max - min)) * 100}%`,
                            right: `${100 - ((values[values.length - 1] - min) / (max - min)) * 100}%`,
                        }}
                    />
                ) : (
                    <div
                        className={sliderRangeStyles}
                        style={{
                            width: `${((values[0] - min) / (max - min)) * 100}%`,
                        }}
                    />
                )}
            </div>
        );
    }
);

SliderTrack.displayName = "Slider.Track";

export default SliderTrack;

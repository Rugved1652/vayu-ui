"use client"
import { Accordion, Typography } from "vayu-ui";

export default function AccordionDemo() {
    return (
        <div className="w-full max-w-md not-prose">
            <Typography.H5 id="single-accordion-label" className="mb-4">
                Accordion Example
            </Typography.H5>
            <Accordion aria-labelledby="single-accordion-label">
                <Accordion.Item itemId="item-1">
                    <Accordion.Header itemId="item-1">
                        Is it accessible?
                    </Accordion.Header>
                    <Accordion.Body itemId="item-1">
                        <Typography.P>
                            Yes. It adheres to the WAI-ARIA design pattern and WCAG 2.2 AA standards.
                        </Typography.P>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item itemId="item-2">
                    <Accordion.Header itemId="item-2">
                        Is it styled?
                    </Accordion.Header>
                    <Accordion.Body itemId="item-2">
                        <Typography.P>
                            Yes. It comes with default styles that matches the other components&apos; aesthetic.
                        </Typography.P>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item itemId="item-3">
                    <Accordion.Header itemId="item-3">
                        Is it animated?
                    </Accordion.Header>
                    <Accordion.Body itemId="item-3">
                        <Typography.P>
                            Yes. It&apos;s animated by default, but you can disable it if you prefer. Animations respect prefers-reduced-motion preferences.
                        </Typography.P>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <hr className="my-8 border-t border-border" />
            <Typography.H5 id="multi-accordion-label" className="mb-4">
                Multiple Items Can Be Open
            </Typography.H5>
            <Accordion allowMultiple aria-labelledby="multi-accordion-label">
                <Accordion.Item itemId="multi-item-1">
                    <Accordion.Header itemId="multi-item-1">
                        Is it accessible?
                    </Accordion.Header>
                    <Accordion.Body itemId="multi-item-1">
                        <Typography.P>
                            Yes. It adheres to the WAI-ARIA design pattern and WCAG 2.2 AA standards.
                        </Typography.P>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item itemId="multi-item-2">
                    <Accordion.Header itemId="multi-item-2">
                        Is it styled?
                    </Accordion.Header>
                    <Accordion.Body itemId="multi-item-2">
                        <Typography.P>
                            Yes. It comes with default styles that matches the other components&apos; aesthetic.
                        </Typography.P>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item itemId="multi-item-3">
                    <Accordion.Header itemId="multi-item-3">
                        Is it animated?
                    </Accordion.Header>
                    <Accordion.Body itemId="multi-item-3">
                        <Typography.P>
                            Yes. It&apos;s animated by default, but you can disable it if you prefer. Animations respect prefers-reduced-motion preferences.
                        </Typography.P>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}

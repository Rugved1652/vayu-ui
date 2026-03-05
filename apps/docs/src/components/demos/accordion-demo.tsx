"use client"
import { Accordion } from "vayu-ui";

export default function AccordionDemo() {
    return (
        <div className="w-full max-w-md not-prose">
            <Accordion>
                <Accordion.Item itemId="item-1">
                    <Accordion.Header itemId="item-1">
                        Is it accessible?
                    </Accordion.Header>
                    <Accordion.Body itemId="item-1">
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item itemId="item-2">
                    <Accordion.Header itemId="item-2">
                        Is it styled?
                    </Accordion.Header>
                    <Accordion.Body itemId="item-2">
                        Yes. It comes with default styles that matches the other
                        components&apos; aesthetic.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item itemId="item-3">
                    <Accordion.Header itemId="item-3">
                        Is it animated?
                    </Accordion.Header>
                    <Accordion.Body itemId="item-3">
                        Yes. It&apos;s animated by default, but you can disable it if you
                        prefer.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <br />
            Multi Open accordion
            <Accordion allowMultiple>
                <Accordion.Item itemId="multi-item-1">
                    <Accordion.Header itemId="multi-item-1">
                        Is it accessible?
                    </Accordion.Header>
                    <Accordion.Body itemId="multi-item-1">
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item itemId="multi-item-2">
                    <Accordion.Header itemId="multi-item-2">
                        Is it styled?
                    </Accordion.Header>
                    <Accordion.Body itemId="multi-item-2">
                        Yes. It comes with default styles that matches the other
                        components&apos; aesthetic.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item itemId="multi-item-3">
                    <Accordion.Header itemId="multi-item-3">
                        Is it animated?
                    </Accordion.Header>
                    <Accordion.Body itemId="multi-item-3">
                        Yes. It&apos;s animated by default, but you can disable it if you
                        prefer.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}

"use client"
import { Accordion } from "vayu-ui";

export default function AccordionDemo() {
    return (
        <div className="w-full max-w-md not-prose">
            <h2 id="single-accordion-label" className="text-xl font-semibold mb-4">Accordion Example</h2>
            <Accordion aria-labelledby="single-accordion-label">
                <Accordion.Item itemId="item-1">
                    <Accordion.Header itemId="item-1">
                        Is it accessible?
                    </Accordion.Header>
                    <Accordion.Body itemId="item-1">
                        <p>Yes. It adheres to the WAI-ARIA design pattern and WCAG 2.2 AA standards.</p>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item itemId="item-2">
                    <Accordion.Header itemId="item-2">
                        Is it styled?
                    </Accordion.Header>
                    <Accordion.Body itemId="item-2">
                        <p>Yes. It comes with default styles that matches the other
                        components&apos; aesthetic.</p>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item itemId="item-3">
                    <Accordion.Header itemId="item-3">
                        Is it animated?
                    </Accordion.Header>
                    <Accordion.Body itemId="item-3">
                        <p>Yes. It&apos;s animated by default, but you can disable it if you
                        prefer. Animations respect prefers-reduced-motion preferences.</p>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <div className="my-8 border-t border-ground-200 dark:border-ground-800"></div>
            <h2 id="multi-accordion-label" className="text-xl font-semibold mb-4">Multiple Items Can Be Open</h2>
            <Accordion allowMultiple aria-labelledby="multi-accordion-label">
                <Accordion.Item itemId="multi-item-1">
                    <Accordion.Header itemId="multi-item-1">
                        Is it accessible?
                    </Accordion.Header>
                    <Accordion.Body itemId="multi-item-1">
                        <p>Yes. It adheres to the WAI-ARIA design pattern and WCAG 2.2 AA standards.</p>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item itemId="multi-item-2">
                    <Accordion.Header itemId="multi-item-2">
                        Is it styled?
                    </Accordion.Header>
                    <Accordion.Body itemId="multi-item-2">
                        <p>Yes. It comes with default styles that matches the other
                        components&apos; aesthetic.</p>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item itemId="multi-item-3">
                    <Accordion.Header itemId="multi-item-3">
                        Is it animated?
                    </Accordion.Header>
                    <Accordion.Body itemId="multi-item-3">
                        <p>Yes. It&apos;s animated by default, but you can disable it if you
                        prefer. Animations respect prefers-reduced-motion preferences.</p>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}

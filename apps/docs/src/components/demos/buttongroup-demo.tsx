"use client";

import { Button } from "vayu-ui";
import { ButtonGroup } from "vayu-ui";

export default function ButtonGroupDemo() {
    return (
        <div className="flex flex-col not-prose gap-10 w-full max-w-lg">
            {/* ── Horizontal Outline ── */}
            <div className="flex flex-col gap-3">
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                    Horizontal (Outline)
                </p>
                <ButtonGroup>
                    <Button variant="outline">
                        <Button.Text>Left</Button.Text>
                    </Button>
                    <Button variant="outline">
                        <Button.Text>Center</Button.Text>
                    </Button>
                    <Button variant="outline">
                        <Button.Text>Right</Button.Text>
                    </Button>
                </ButtonGroup>
            </div>

            {/* ── Primary Variant ── */}
            <div className="flex flex-col gap-3">
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                    Primary
                </p>
                <ButtonGroup>
                    <Button variant="primary">
                        <Button.Text>Save</Button.Text>
                    </Button>
                    <Button variant="primary">
                        <Button.Text>Save &amp; Close</Button.Text>
                    </Button>
                </ButtonGroup>
            </div>

            {/* ── Vertical ── */}
            <div className="flex flex-col gap-3">
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                    Vertical
                </p>
                <ButtonGroup orientation="vertical" className="w-fit">
                    <Button variant="outline">
                        <Button.Text>Top</Button.Text>
                    </Button>
                    <Button variant="outline">
                        <Button.Text>Middle</Button.Text>
                    </Button>
                    <Button variant="outline">
                        <Button.Text>Bottom</Button.Text>
                    </Button>
                </ButtonGroup>
            </div>

            {/* ── Full Width ── */}
            <div className="flex flex-col gap-3">
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                    Full Width
                </p>
                <ButtonGroup fullWidth>
                    <Button variant="secondary">
                        <Button.Text>Cancel</Button.Text>
                    </Button>
                    <Button variant="primary">
                        <Button.Text>Confirm</Button.Text>
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    );
}

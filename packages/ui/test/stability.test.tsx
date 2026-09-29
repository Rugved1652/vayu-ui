import React, { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from '../src/components/Modal';
import { Drawer } from '../src/components/Drawer';
import { TextInput } from '../src/components/TextInput';
import { Typography } from '../src/components/Typography';

function Numeric({
  value,
  onChange,
  ...props
}: {
  value?: string;
  onChange?: (v: string) => void;
  [key: string]: unknown;
}) {
  const [current, setCurrent] = useState(value ?? '');
  return (
    <TextInput
      value={current}
      onChange={(v) => {
        setCurrent(v);
        onChange?.(v);
      }}
    >
      <TextInput.Label>Amount</TextInput.Label>
      <TextInput.Field>
        <TextInput.NumberInput {...props} />
      </TextInput.Field>
    </TextInput>
  );
}

describe('numeric input', () => {
  it.each([
    ['01', '1'],
    ['00', '0'],
    ['1212', '1,212'],
    ['12345678901234567890', '12,345,678,901,234,567,890'],
  ])('formats %s without losing precision', (raw, expected) => {
    const onChange = vi.fn();
    render(<Numeric format onChange={onChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: raw } });
    expect((input as HTMLInputElement).value).toBe(expected);
    expect(onChange).toHaveBeenLastCalledWith(expected.replaceAll(',', ''));
  });
  it('keeps empty values and decimal editing states, and clamps on blur', async () => {
    render(<Numeric format min={-10} max={5000} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '-0001.20' } });
    expect(input.value).toBe('-1.20');
    fireEvent.change(input, { target: { value: '9999' } });
    fireEvent.blur(input);
    expect(input.value).toBe('5,000');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input);
    expect(input.value).toBe('');
  });
  it('validates pasted and typed values and preserves caller events', async () => {
    const onKeyDown = vi.fn();
    const onPaste = vi.fn();
    const user = userEvent.setup();
    render(<Numeric format numberType="natural" onKeyDown={onKeyDown} onPaste={onPaste} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    await user.click(input);
    await user.paste('1,212');
    expect(input.value).toBe('1,212');
    await user.type(input, 'a-.');
    expect(input.value).toBe('1,212');
    expect(onKeyDown).toHaveBeenCalled();
    expect(onPaste).toHaveBeenCalled();
    await user.clear(input);
    expect(input.value).toBe('');
  });
  it('allows editing in the middle of a grouped value', async () => {
    const user = userEvent.setup();
    render(<Numeric format value="1234" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    await user.click(input);
    input.setSelectionRange(3, 3);
    await user.keyboard('9');
    expect(input.value).toBe('12,934');
    expect(input.selectionStart).toBe(4);
  });
});

for (const [name, Overlay] of [
  ['Modal', Modal],
  ['Drawer', Drawer],
] as const) {
  describe(`${name} close controls`, () => {
    it('exposes a labeled header X and restores focus after closing', async () => {
      const user = userEvent.setup();
      render(
        <Overlay>
          <Overlay.Trigger>Open panel</Overlay.Trigger>
          <Overlay.Content>
            <Overlay.Header>
              <Overlay.Title>A long panel title</Overlay.Title>
              <Overlay.Description>Details</Overlay.Description>
            </Overlay.Header>
          </Overlay.Content>
        </Overlay>,
      );
      const trigger = screen.getByRole('button', { name: 'Open panel' });
      await user.click(trigger);
      expect(screen.getByRole('dialog', { name: 'A long panel title' })).toBeTruthy();
      const close = screen.getByRole('button', { name: `Close ${name.toLowerCase()}` });
      expect(close.className).not.toContain('absolute');
      await user.click(close);
      expect(screen.queryByRole('dialog')).toBeNull();
      await waitFor(() => expect(document.activeElement).toBe(trigger));
    });
    it('focuses synchronously so Escape works immediately after opening', () => {
      render(
        <Overlay>
          <Overlay.Trigger>Open immediately</Overlay.Trigger>
          <Overlay.Content>
            <Overlay.Header>
              <Overlay.Title>Immediate panel</Overlay.Title>
            </Overlay.Header>
          </Overlay.Content>
        </Overlay>,
      );
      const trigger = screen.getByRole('button', { name: 'Open immediately' });
      trigger.focus();
      fireEvent.click(trigger);
      const dialog = screen.getByRole('dialog');
      expect(dialog.contains(document.activeElement)).toBe(true);
      fireEvent.keyDown(document.activeElement!, { key: 'Escape' });
      expect(screen.queryByRole('dialog')).toBeNull();
      expect(document.activeElement).toBe(trigger);
    });
    it('respects preventDefault on an asChild close action', async () => {
      const user = userEvent.setup();
      render(
        <Overlay defaultOpen>
          <Overlay.Content>
            <Overlay.Header showClose={false}>
              <Overlay.Title>Panel</Overlay.Title>
            </Overlay.Header>
            <Overlay.Close asChild>
              <button onClick={(event) => event.preventDefault()}>Keep open</button>
            </Overlay.Close>
          </Overlay.Content>
        </Overlay>,
      );
      await user.click(screen.getByRole('button', { name: 'Keep open' }));
      expect(screen.getByRole('dialog')).toBeTruthy();
      await user.keyboard('{Escape}');
      expect(screen.queryByRole('dialog')).toBeNull();
    });
    it('does not duplicate a manually composed header close button', () => {
      render(
        <Overlay defaultOpen>
          <Overlay.Content>
            <Overlay.Header>
              <Overlay.Title>Panel</Overlay.Title>
              <Overlay.Close aria-label="Dismiss" />
            </Overlay.Header>
          </Overlay.Content>
        </Overlay>,
      );
      expect(screen.getAllByRole('button')).toHaveLength(1);
    });
  });
}
it('renders semantic Typography with the application heading scale', () => {
  render(<Typography.H1>Dashboard</Typography.H1>);
  const heading = screen.getByRole('heading', { level: 1 });
  expect(heading.className).toContain('text-h1');
  expect(heading.className).not.toContain('text-6xl');
});

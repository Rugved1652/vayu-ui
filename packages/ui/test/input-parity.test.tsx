import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select, type SelectRootProps } from '../src/components/Select';
import { TextInput } from '../src/components/TextInput';

function FruitSelect(props: Omit<SelectRootProps, 'children'>) {
  return (
    <Select.Root label="Fruit" {...props}>
      <Select.Trigger placeholder="Choose fruit" />
      <Select.Content>
        <Select.List>
          <Select.Item value="apple">Apple</Select.Item>
          <Select.Item value="banana">Banana</Select.Item>
        </Select.List>
      </Select.Content>
    </Select.Root>
  );
}

beforeEach(() => {
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      disconnect() {}
    },
  );
});
afterEach(() => vi.unstubAllGlobals());

describe('disabled input controls', () => {
  it('prevents opening and searching a disabled Select by mouse, focus, or keyboard', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    const onValueChange = vi.fn();
    const { container } = render(
      <FruitSelect disabled onSearch={onSearch} onValueChange={onValueChange} />,
    );
    const input = screen.getByRole('combobox') as HTMLInputElement;
    expect(input.disabled).toBe(true);
    await user.click(input);
    fireEvent.click(container.querySelector('[aria-disabled="true"]')!);
    fireEvent.click(container.querySelector('.lucide-chevron-down')!);
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.change(input, { target: { value: 'apple' } });
    expect(input.getAttribute('aria-expanded')).toBe('false');
    expect(screen.queryByRole('listbox')).toBeNull();
    expect(onSearch).not.toHaveBeenCalled();
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('keeps selected chips when disabled, then allows removal when enabled', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const { rerender } = render(
      <FruitSelect disabled multiple defaultValue={['apple']} onValueChange={onValueChange} />,
    );
    const remove = screen.getByRole('button', { name: 'Remove Apple' }) as HTMLButtonElement;
    expect(remove.disabled).toBe(true);
    await user.click(remove);
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Backspace' });
    expect(onValueChange).not.toHaveBeenCalled();
    rerender(<FruitSelect multiple defaultValue={['apple']} onValueChange={onValueChange} />);
    await user.click(screen.getByRole('button', { name: 'Remove Apple' }));
    expect(onValueChange).toHaveBeenLastCalledWith([]);
  });

  it('closes an open Select on disable and releases the body scroll lock', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<FruitSelect />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeTruthy();
    expect(document.body.style.overflow).toBe('hidden');
    rerender(<FruitSelect disabled />);
    expect(screen.queryByRole('listbox')).toBeNull();
    expect(document.body.style.overflow).not.toBe('hidden');
    rerender(<FruitSelect />);
    expect(screen.queryByRole('listbox')).toBeNull();
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByRole('option', { name: 'Banana' }));
    expect((screen.getByRole('combobox') as HTMLInputElement).value).toBe('Banana');
  });

  it('disables TextInput clear and password visibility actions', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(
      <TextInput disabled inputType="password" defaultValue="secret" onChange={onChange}>
        <TextInput.Label>Password</TextInput.Label>
        <TextInput.Field>
          <TextInput.PasswordInput />
          <TextInput.ClearButton />
        </TextInput.Field>
      </TextInput>,
    );
    const input = screen.getByLabelText('Password') as HTMLInputElement;
    for (const name of ['Show password', 'Clear input']) {
      const button = screen.getByRole('button', { name }) as HTMLButtonElement;
      expect(button.disabled).toBe(true);
      await user.click(button);
    }
    expect(input.type).toBe('password');
    expect(input.value).toBe('secret');
    expect(onChange).not.toHaveBeenCalled();
    rerender(
      <TextInput inputType="password" defaultValue="secret" onChange={onChange}>
        <TextInput.Label>Password</TextInput.Label>
        <TextInput.Field>
          <TextInput.PasswordInput />
          <TextInput.ClearButton />
        </TextInput.Field>
      </TextInput>,
    );
    await user.click(screen.getByRole('button', { name: 'Show password' }));
    expect(input.type).toBe('text');
    await user.click(screen.getByRole('button', { name: 'Clear input' }));
    expect(onChange).toHaveBeenLastCalledWith('');
  });
});

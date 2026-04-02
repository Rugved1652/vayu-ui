'use client';

import React, { useState } from 'react';
import { Select, OptionData, SelectValue } from 'vayu-ui';
import { Card, CardContent, CardHeader } from 'vayu-ui';
import { Badge } from 'vayu-ui';
import { Divider } from 'vayu-ui';

export default function SelectAdvancedDemo() {
  // ========================================
  // 1. Basic Single Select
  // ========================================
  const [basicValue, setBasicValue] = useState<SelectValue>('apple');

  // ========================================
  // 2. Multi Select
  // ========================================
  const [multiValue, setMultiValue] = useState<SelectValue>(['react', 'nextjs']);

  // ========================================
  // 3. Async Search - Simulated API
  // ========================================
  const [asyncValue, setAsyncValue] = useState<SelectValue>();

  const handleAsyncSearch = async (searchValue: string): Promise<OptionData[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const users = [
      { value: 'user1', label: 'John Doe', data: { email: 'john@example.com' } },
      { value: 'user2', label: 'Jane Smith', data: { email: 'jane@example.com' } },
      { value: 'user3', label: 'Bob Johnson', data: { email: 'bob@example.com' } },
      { value: 'user4', label: 'Alice Williams', data: { email: 'alice@example.com' } },
      { value: 'user5', label: 'Charlie Brown', data: { email: 'charlie@example.com' } },
    ];
    return users.filter((user) => user.label.toLowerCase().includes(searchValue.toLowerCase()));
  };

  // ========================================
  // 4. Createable Single Select
  // ========================================
  const [createableValue, setCreateableValue] = useState<SelectValue>();
  const [createableOptions, setCreateableOptions] = useState<OptionData[]>([
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'devops', label: 'DevOps' },
  ]);

  const handleCreateOption = async (inputValue: string): Promise<OptionData | null> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const newOption: OptionData = {
      value: inputValue.toLowerCase().replace(/\s+/g, '-'),
      label: inputValue,
    };
    setCreateableOptions((prev) => [...prev, newOption]);
    return newOption;
  };

  const validateCreate = (inputValue: string): boolean | string => {
    if (inputValue.length < 2) return 'Option must be at least 2 characters';
    if (inputValue.length > 30) return 'Option must be less than 30 characters';
    return true;
  };

  // ========================================
  // 5. Createable Multi Select
  // ========================================
  const [multiCreateableValue, setMultiCreateableValue] = useState<SelectValue>(['typescript']);

  // ========================================
  // 6. Async + Createable Combined
  // ========================================
  const [combinedValue, setCombinedValue] = useState<SelectValue>();

  const handleProductSearch = async (searchValue: string): Promise<OptionData[]> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const products = [
      { value: 'prod1', label: 'MacBook Pro 16"', data: { price: 2499 } },
      { value: 'prod2', label: 'iPhone 15 Pro', data: { price: 1199 } },
      { value: 'prod3', label: 'iPad Air', data: { price: 799 } },
      { value: 'prod4', label: 'AirPods Pro', data: { price: 249 } },
    ];
    return products.filter((p) => p.label.toLowerCase().includes(searchValue.toLowerCase()));
  };

  const handleCreateProduct = async (inputValue: string): Promise<OptionData | null> => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { value: `prod-${Date.now()}`, label: inputValue, data: { price: 0, isNew: true } };
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Advanced Select Component
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            With Async Search, Createable Options & Compound Components
          </p>
        </div>

        <div className="grid gap-6">
          {/* Basic Single Select */}
          <Card>
            <CardHeader
              title="Basic Single Select"
              action={<Badge variant="muted">Static</Badge>}
            />
            <CardContent>
              <Select.Root value={basicValue} onValueChange={setBasicValue} label="Select Fruit">
                <Select.Trigger placeholder="Choose a fruit..." />
                <Select.Content>
                  <Select.List>
                    <Select.Item value="apple">Apple</Select.Item>
                    <Select.Item value="banana">Banana</Select.Item>
                    <Select.Item value="cherry">Cherry</Select.Item>
                    <Select.Item value="date">Date</Select.Item>
                  </Select.List>
                  <Select.NotFound />
                </Select.Content>
              </Select.Root>
              <p className="mt-2 text-sm text-muted-foreground">
                Selected:{' '}
                <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">
                  {String(basicValue)}
                </code>
              </p>
            </CardContent>
          </Card>

          {/* Multi Select */}
          <Card>
            <CardHeader title="Multi Select" action={<Badge variant="muted">Tags</Badge>} />
            <CardContent>
              <Select.Root
                value={multiValue}
                onValueChange={setMultiValue}
                label="Technologies"
                multiple
              >
                <Select.Trigger placeholder="Add technologies..." />
                <Select.Content>
                  <Select.List>
                    <Select.Item value="react">React</Select.Item>
                    <Select.Item value="nextjs">Next.js</Select.Item>
                    <Select.Item value="vue">Vue</Select.Item>
                    <Select.Item value="svelte">Svelte</Select.Item>
                    <Select.Item value="angular">Angular</Select.Item>
                  </Select.List>
                  <Select.NotFound />
                </Select.Content>
              </Select.Root>
              <p className="mt-2 text-sm text-muted-foreground">
                Selected:{' '}
                <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">
                  {JSON.stringify(multiValue)}
                </code>
              </p>
            </CardContent>
          </Card>

          <Divider />

          {/* Async Search */}
          <Card>
            <CardHeader
              title="Async Search"
              subtitle="Search users from simulated API"
              action={<Badge variant="brand">API</Badge>}
            />
            <CardContent>
              <Select.Root
                value={asyncValue}
                onValueChange={setAsyncValue}
                label="Search Users"
                onSearch={handleAsyncSearch}
                searchDebounce={300}
                minSearchLength={1}
              >
                <Select.Trigger placeholder="Type to search users..." showSearchIcon />
                <Select.Content>
                  <Select.Loading />
                  <Select.SearchHint />
                  <Select.AsyncOptions />
                  <Select.NotFound>No users found</Select.NotFound>
                  <Select.Footer>Search powered by User API</Select.Footer>
                </Select.Content>
              </Select.Root>
              <p className="mt-2 text-sm text-muted-foreground">
                Selected:{' '}
                <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">
                  {String(asyncValue ?? 'none')}
                </code>
              </p>
            </CardContent>
          </Card>

          {/* Createable */}
          <Card>
            <CardHeader
              title="Createable Select"
              subtitle="Create new options via API"
              action={<Badge variant="destructive">New!</Badge>}
            />
            <CardContent>
              <Select.Root
                value={createableValue}
                onValueChange={setCreateableValue}
                label="Select or Create Skill"
                creatable
                onCreateOption={handleCreateOption}
                validateCreate={validateCreate}
                createText="Add Skill"
              >
                <Select.Trigger placeholder="Select or create a skill..." />
                <Select.Content>
                  <Select.List>
                    {createableOptions.map((option) => (
                      <Select.Item key={option.value} value={option.value}>
                        {option.label}
                      </Select.Item>
                    ))}
                  </Select.List>
                  <Select.CreateButton />
                  <Select.NotFound />
                  <Select.Error type="create" />
                </Select.Content>
              </Select.Root>
              <p className="mt-2 text-sm text-muted-foreground">
                Selected:{' '}
                <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">
                  {String(createableValue ?? 'none')}
                </code>
              </p>
            </CardContent>
          </Card>

          {/* Createable Multi */}
          <Card>
            <CardHeader
              title="Createable Multi Select"
              action={<Badge variant="destructive">New!</Badge>}
            />
            <CardContent>
              <Select.Root
                value={multiCreateableValue}
                onValueChange={setMultiCreateableValue}
                label="Add Tags"
                multiple
                creatable
                onCreateOption={handleCreateOption}
                validateCreate={validateCreate}
              >
                <Select.Trigger placeholder="Add or create tags..." />
                <Select.Content>
                  <Select.List>
                    <Select.Item value="javascript">JavaScript</Select.Item>
                    <Select.Item value="typescript">TypeScript</Select.Item>
                    <Select.Item value="python">Python</Select.Item>
                    <Select.Item value="rust">Rust</Select.Item>
                  </Select.List>
                  <Select.CreateButton>Add new tag</Select.CreateButton>
                  <Select.NotFound />
                </Select.Content>
              </Select.Root>
              <p className="mt-2 text-sm text-muted-foreground">
                Selected:{' '}
                <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">
                  {JSON.stringify(multiCreateableValue)}
                </code>
              </p>
            </CardContent>
          </Card>

          <Divider />

          {/* Combined: Async + Createable */}
          <Card className="border-primary/50">
            <CardHeader
              title="Async + Createable"
              subtitle="Search products and create if not found"
              action={<Badge variant="brand">Combined</Badge>}
            />
            <CardContent>
              <Select.Root
                value={combinedValue}
                onValueChange={setCombinedValue}
                label="Search or Add Product"
                onSearch={handleProductSearch}
                searchDebounce={400}
                creatable
                onCreateOption={handleCreateProduct}
                validateCreate={(val) => val.length >= 2 || 'Product name too short'}
              >
                <Select.Trigger placeholder="Search or create a product..." showSearchIcon />
                <Select.Content>
                  <Select.Loading>Searching products...</Select.Loading>
                  <Select.SearchHint>Type to search</Select.SearchHint>
                  <Select.AsyncOptions />
                  <Select.CreateButton>Add Product</Select.CreateButton>
                  <Select.NotFound>No products found</Select.NotFound>
                  <Select.Error type="create" />
                </Select.Content>
              </Select.Root>
              <p className="mt-2 text-sm text-muted-foreground">
                Selected:{' '}
                <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">
                  {String(combinedValue ?? 'none')}
                </code>
              </p>
            </CardContent>
          </Card>

          {/* Error State */}
          <Card>
            <CardHeader title="Error State" />
            <CardContent>
              <Select.Root label="Required Field" error="This field is required">
                <Select.Trigger placeholder="Select an option..." />
                <Select.Content>
                  <Select.List>
                    <Select.Item value="1">Option 1</Select.Item>
                    <Select.Item value="2">Option 2</Select.Item>
                  </Select.List>
                </Select.Content>
              </Select.Root>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

-- Create customers table
create table public.customers (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    name text not null,
    email text,
    phone text,
    address jsonb default null,
    tenant_id uuid references public.tenants(id),
    category text default 'Regular'
);

-- Enable RLS
alter table public.customers enable row level security;

-- Create policies
create policy "Enable read access for all users"
    on public.customers for select
    using (true);

create policy "Enable insert for authenticated users only"
    on public.customers for insert
    with check (auth.role() = 'authenticated');

create policy "Enable update for authenticated users only"
    on public.customers for update
    using (auth.role() = 'authenticated');

create policy "Enable delete for authenticated users only"
    on public.customers for delete
    using (auth.role() = 'authenticated');

-- Create function to automatically update updated_at
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$;

-- Create trigger for updated_at
create trigger handle_customers_updated_at
    before update on public.customers
    for each row
    execute function public.handle_updated_at();

-- Create index for faster searches
create index customers_name_idx on public.customers(name);
create index customers_email_idx on public.customers(email);
create index customers_tenant_id_idx on public.customers(tenant_id);
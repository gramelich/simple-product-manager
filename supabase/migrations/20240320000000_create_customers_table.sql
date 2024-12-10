create table if not exists public.customers (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    name text not null,
    email text,
    phone text,
    tenant_id uuid references public.tenants(id) on delete cascade,
    constraint customers_tenant_id_fkey foreign key (tenant_id) references tenants(id) on delete cascade
);

-- Enable RLS
alter table public.customers enable row level security;

-- Create policies
create policy "Tenants can view their own customers"
    on public.customers for select
    using (auth.uid() in (
        select user_id from tenant_users where tenant_id = customers.tenant_id
    ));

create policy "Tenants can insert their own customers"
    on public.customers for insert
    with check (auth.uid() in (
        select user_id from tenant_users where tenant_id = customers.tenant_id
    ));

create policy "Tenants can update their own customers"
    on public.customers for update
    using (auth.uid() in (
        select user_id from tenant_users where tenant_id = customers.tenant_id
    ));

create policy "Tenants can delete their own customers"
    on public.customers for delete
    using (auth.uid() in (
        select user_id from tenant_users where tenant_id = customers.tenant_id
    ));

-- Create updated_at trigger
create trigger handle_updated_at before update on public.customers
    for each row execute procedure moddatetime (updated_at);